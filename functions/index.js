const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.addWelcomeMessages = functions.auth.user().onCreate(event => {
  const user = event.data;
  console.log('A new user signed in for the first time.');
  const fullName = user.displayName || 'Anonymous';

  const payload = {
    notification: {
      title: `Welcome!!`,
      body: `${fullName} signed in for the first time!`
    }
  }

  // Saves the new welcome message into the database
  // which then displays it in the FriendlyChat clients.
  return admin.database().ref('welcome').push({
    name: 'Welcome Message',
    text: `${fullName} signed in for the first time! Welcome!` // Using back-ticks.
  }).then(() => {
    return admin.database().ref('fcmTokens').limitToLast(1).on('value', function(snapshot) {
      const token = Object.keys(snapshot.val());
      return admin.messaging().sendToDevice(token, payload).then(response => {
        const error = response.results.forEach((result, index) => {
          const error = result.error;
          if (error) {
            console.error('Failure sending welcome message to', token, error);
          }
        });
        console.log('Welcome message written to database.');
      }).catch(function(error) {
        console.log("Error sending welcome message:", error);
      });
    });
  });
});

// Sends a notifications to all users when a new message is posted.
exports.sendNotifications = functions.database.ref('/journal/{journalId}').onCreate(event => {
  const snapshot = event.data;

  // Notification details.
  const text = snapshot.val().text;
  const payload = {
    notification: {
      title: `${snapshot.val().name} posted a new entry`,
      body: text ? (text.length <= 100 ? text : text.substring(0, 97) + '...') : '',
      icon: snapshot.val().photoUrl || '/images/placeholder.png',
      click_action: `https://${functions.config().firebase.authDomain}`
    }
  };

  // Get the list of device tokens.
  return admin.database().ref('fcmTokens').once('value').then(allTokens => {
    if (allTokens.val()) {
      // Listing all tokens.
      const tokens = Object.keys(allTokens.val());

      // Send notifications to all tokens.
      return admin.messaging().sendToDevice(tokens, payload).then(response => {
        // For each message check if there was an error.
        const tokensToRemove = [];
        response.results.forEach((result, index) => {
          const error = result.error;
          if (error) {
            console.error('Failure sending notification to', tokens[index], error);
            // Cleanup the tokens who are not registered anymore.
            if (error.code === 'messaging/invalid-registration-token' ||
                error.code === 'messaging/registration-token-not-registered') {
              tokensToRemove.push(allTokens.ref.child(tokens[index]).remove());
            }
          }
        });
        return Promise.all(tokensToRemove);
      });
    }
  });
});