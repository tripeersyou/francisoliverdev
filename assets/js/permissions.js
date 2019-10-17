document.addEventListener('turbolinks:load',function () {
    let notifyButton = document.querySelector('#notify-me');

    notifyButton.addEventListener('click',function(e){
        e.preventDefault();
        if(Notification.permission === 'granted'){
            new Notification("You have already enabled notifications!",{
                body: "We'll keep you in loop for new blog posts!",
                icon: '/assets/img/favicon.png'
            });
        } else {
            Notification.requestPermission(function(status) {
                if(status === 'granted'){
                    new Notification("You have enabled notifications!",{
                        body: "We'll keep you in loop for new blog posts!",
                        icon: '/assets/img/favicon.png'
                    });
                    console.log(`Notification is granted`);
                } else {
                    console.log('Notification is blocked');
                }
            }); 
        }
    });
});
