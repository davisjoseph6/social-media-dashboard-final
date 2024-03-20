# social-media-dashboard tool
## with messenger and AI chatbot
## with analytics, posts page and home feed.

- Authentication - registration and login. (If time allows using Facebook's Auth service).
- Analytics of facebook posts.
- home page with feed from facebook (and maybe Instagram)
- make posts to facebook
- messaging within the app
- AI chatbot.

# Social Media Dashboard Application.
This project is a social media dashboard with messenger and AI chatbot features.

## Installation..
Detailed steps to install and run the project.

## Usage - to test if it works.
How to use the application.

## Contributing
Contribution guidelines.

## License
License information..

# Social Media Dashboard.
It has: 
- a login feature, 
- a post feature to post text and images to Facebook and Twitter/Instagram, 
- reading others' postsfrom Facebook and Twitter/Instagram, 
- messenger feature, 
- Analytics feature.  
- an AI chatbot feature.
- Use Amazon Lamda service
Description and setup instructions for the project.

Not using NodeJs or React, but with Apache, PHP, MySQL, and the traditional approach.


------------------------------------------------------------------------------

Facebook Login API, Facebook Graph API, Facebook Social Plugins.

--------------------------------------------------------

Site URL: https://vc5xlq3iwg.execute-api.eu-west-3.amazonaws.com/dev/users/login

---------------------

JavaScript code:

The Facebook SDK for JavaScript doesn't have any standalone files that need to be downloaded or installed, instead you simply need to include a short piece of regular JavaScript in your HTML that will asynchronously load the SDK into your pages. The async load means that it does not block loading other elements of your page.


<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '{your-app-id}',
      cookie     : true,
      xfbml      : true,
      version    : '{api-version}'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>

Site URL: https://vc5xlq3iwg.execute-api.eu-west-3.amazonaws.com/dev/users/login

-----------------------------------------------

3. Check Login Status
The first step when loading your web page is figuring out if a person is already logged into your app with Facebook login. You start that process with a call to FB.getLoginStatus. That function will trigger a call to Facebook to get the login status and call your callback function with the results.
Taken from the sample code above, here's some of the code that's run during page load to check a person's login status:

FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
});

Copy Code
The response object that's provided to your callback contains a number of fields:


{
    status: 'connected',
    authResponse: {
        accessToken: '...',
        expiresIn:'...',
        signedRequest:'...',
        userID:'...'
    }
}


Copy Code
status specifies the login status of the person using the app. The status can be one of the following:
connected - the person is logged into Facebook, and has logged into your app.
not_authorized - the person is logged into Facebook, but has not logged into your app.
unknown - the person is not logged into Facebook, so you don't know if they've logged into your app or FB.logout() was called before and therefore, it cannot connect to Facebook.
authResponse is included if the status is connected and is made up of the following:
accessToken - contains an access token for the person using the app.
expiresIn - indicates the UNIX time when the token expires and needs to be renewed.
signedRequest - a signed parameter that contains information about the person using the app.
userID - the ID of the person using the app.
Once your app knows the login status of the person using it, it can do one of the following:
If the person is logged into Facebook and your app, redirect them to your app's logged in experience.
If the person isn't logged into your app, or isn't logged into Facebook, prompt them with the Login dialog with FB.login() or show them the Login Button.







Development logs: Postman..
