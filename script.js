window.onload = function(){
    var media = window.matchMedia('(max-width: 540px)');
    textChange(media); 
    media.addEventListener('change', textChange);

    var device = window.matchMedia('(max-width: 1366px)');
    deviceChange(device); 
    device.addEventListener('change', deviceChange);

    var overlay_layer = document.querySelector('.overlay-layer'),
        side_nav = document.querySelector('.side-nav'),
        side_nav_contents = document.querySelector('.side-nav-contents'),
        content =  document.querySelector('.content'),
        about_content = document.querySelector('.about-content'),
        comet = document.querySelector('.comet'),
        posX = 0, posY = 0, slope = 0.2,
        speed = [18, 8, 20, 22],
        timer = setInterval( frame, 20);


    function textChange(media){
        if(media.matches){ 
            document.getElementById('detail-left').innerHTML = "Enlin's Portfolio";
            document.getElementById('detail-right').innerHTML = "Designed and Developed in 2020";
        } 
        else{
            document.getElementById('detail-left').innerHTML = "Enlin Quental";
            document.getElementById('detail-right').innerHTML = "Portfolio";
        }
    };

    function deviceChange(device){
        if(device.matches){ 
            comet_hit_offset = 1;
            window.addEventListener('deviceorientation', deviceOrientation);
            document.removeEventListener('mousemove', mouseMove);
        } 
        else{
            comet_hit_offset = 0; 
            document.addEventListener('mousemove', mouseMove);
            window.removeEventListener('deviceorientation', deviceOrientation);
        }
    };
    
    function MenuBar(){
        overlay_layer.style.display = 'block';
        overlay_layer.style.opacity = '0.83';
        side_nav.style.width = '72vw';
        side_nav_contents.style.opacity = '1';
    };
    
    function MenuClose(){
        overlay_layer.style.display = 'none';
        overlay_layer.style.opacity = '0';
        side_nav.style.width = '0vw';
        side_nav_contents.style.opacity = '0';
    };

    function Home(){
        about_content.style.opacity = '0';
        setTimeout(function(){ 
            about_content.style.display = 'none'; 
            content.style.display = 'block';
        }, 300);
        setTimeout(function(){ 
            content.style.opacity = '1';
        }, 400);
    };

    function About(){
        content.style.opacity = '0';
        setTimeout(function(){ 
            content.style.display = 'none'; 
            about_content.style.display = 'block';
        }, 300);
        setTimeout(function(){ 
            about_content.style.opacity = '1';
        }, 400);
    };

    function deviceOrientation(event){
        var x = -event.alpha; //jumps at 180,-180
        var y = -event.beta;

        if( x > 180 ){ x = 180; };
        if( x < -180 ){ x = -180; };
        if( y > 180 ){ y = 180; };
        if( y < -180 ){ y = -180; };
        x += 180;
        y += 180;

        var i, layer = document.querySelectorAll('.layer');
        for(i = 0; i < layer.length; i++){
            var speed = layer[i].getAttribute('data-speed');
            if(1 < i < 5){ speed -= 8;}
            var xX = (window.innerWidth - (x * speed))/130 + 1;// /200 + 5;
            var yY = (window.innerHeight - (y * speed))/130 - 2;
            if(i != 5){
                if(i < 5){ xX -= 10; }
                layer[i].style.transform = 'translateX(' + xX + 'vw) translateY(' + yY + 'vh)';
            }
        }
    };

    function mouseMove(e){
        var i, layer = document.querySelectorAll('.layer');
        for(i = 0; i < layer.length; i++){
            var speed = layer[i].getAttribute('data-speed');
            var x = (window.innerWidth - (e.clientX * speed))/3000;
            var y = (window.innerHeight - (e.clientY * speed))/3000;
            layer[i].style.transform = 'translateX(' + x + 'vw) translateY(' + y + 'vh)';
        }
    };

    function frame(){
        var w = document.querySelector('.main-content').clientWidth;
        var h = document.querySelector('.main-content').clientHeight;
        if((posX >= w) || (posY >= h)){ 
            posX = Math.floor(Math.random() * w); 
            posY = 0; //Math.floor(Math.random() * h);
            slope = Math.sin((Math.floor(Math.random() * (75 - 20 + 1)) + 20) * Math.PI / 180);
            clearInterval(timer);
            timer = setInterval( frame, speed[Math.floor(Math.random() * speed.length)]);
        }
        else{
            posY = posY + 0.3, posX = posY / slope;
            comet.style.top = posY + 'px';
            comet.style.left = posX + 'px';
        }
    };

    document.getElementById('menu-bar').onclick = MenuBar;
    document.getElementById('menu-close').onclick = MenuClose;  
    document.getElementById('home').onclick = Home;
    document.getElementById('about-1').onclick = About;  
    document.getElementById('about-2').onclick = function(){
        MenuClose();
        setTimeout(function(){
            About();
        }, 200);
    };
};



  


