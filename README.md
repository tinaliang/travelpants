# travelpants

First week app for Firebase team

TODO:
add notification functionality
css?

FCM token:
cBSX_LbL9X0:APA91bFxcW5OoifygxT6RMHeiY5m-j2GTqk_gNkVw2sEpKmjcvaemjxcrqJElbnzroxFf2FPQIm1gtfbdXxRM9lQfvFB4TIjtxMAOP0JxoWGSmH7TgLJdL8h1IMucQW-mRVN21iHSldK

Server Key:
AAAAKalHSu4:APA91bH3PGWEOmOQF1LsWveCksey734z8vOZdOZ1Uf7t20tkkEINBxhWC9SDW-K6RcRY_FWRS5R-yg8sN2cM8jq_FPU79-E2P38IceTDOgoWnOgHo8WRHLbJambH1n2X9NS0GuR6y1N6

curl -H "Content-Type: application/json" \
     -H "Authorization: key=AAAAKalHSu4:APA91bH3PGWEOmOQF1LsWveCksey734z8vOZdOZ1Uf7t20tkkEINBxhWC9SDW-K6RcRY_FWRS5R-yg8sN2cM8jq_FPU79-E2P38IceTDOgoWnOgHo8WRHLbJambH1n2X9NS0GuR6y1N6" \
     -d '{
           "notification": {
             "title": "New chat message!",
             "body": "There is a journal entry",
             "icon": "/images/placeholder.png",
             "click_action": "http://localhost:5000/index2.html"
           },
           "to": "YcBSX_LbL9X0:APA91bFxcW5OoifygxT6RMHeiY5m-j2GTqk_gNkVw2sEpKmjcvaemjxcrqJElbnzroxFf2FPQIm1gtfbdXxRM9lQfvFB4TIjtxMAOP0JxoWGSmH7TgLJdL8h1IMucQW-mRVN21iHSldK"
         }' \
     https://fcm.googleapis.com/fcm/send
