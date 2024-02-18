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
License information.

# Social Media Dashboard.
It has: 
- a login feature, 
- a post feature to post text and images to Facebook and Twitter/Instagram, 
- reading others' postsfrom Facebook and Twitter/Instagram, 
- messenger feature, 
- Analytics feature.  
- an AI chatbot feature..
- Use Amazon Lamda service
Description and setup instructions for the project.

Not using NodeJs or React, but with Apache, PHP, MySQL, and the traditional approach.

Javascript code for Facebook


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

Development logs: Postman..
