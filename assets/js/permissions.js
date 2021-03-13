document.addEventListener('turbolinks:load',function () {
    let notifyButton = document.querySelector('#notify-me');

    notifyButton.addEventListener('click',function(e){
        e.preventDefault();
        if(Notification.permission === 'granted'){
            navigator.serviceWorker.getRegistration().then(function(reg) {
                reg.showNotification('You have already enabled notifications!',{
                    body: "Stay tuned for new blog posts!",
                    icon: '/assets/img/favicon.png'
                });
            });
        } else {
            Notification.requestPermission(function(status) {
                if(status === 'granted'){
                    navigator.serviceWorker.getRegistration().then(function(reg) {
                        reg.showNotification('Hello World!',{
                            body: "You have enabled notifications. We'll keep you in the loop for new blog posts!",
                            icon: '/assets/img/favicon.png'
                        });
                    });
                    console.log(`Notification is granted`);
                } else {
                    console.log('Notification is blocked');
                }
            }); 
        }
    });
});
