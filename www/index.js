document.addEventListener("blendready",function() {

    var main = Blend.ui; // notice it!

    var start;

    // FastClick.attach(document.body);//在chrome的touch下面 失灵，所以暂时禁掉
    //if(main.api.getLayerId()!=0) return;
    main.layerInit("0", function(dom){
        initCard();
        var LayerGroup = main.LayerGroup;

        var cards = [];
        for(var i=0;i<cardNum;i++) {
            cards.push({id:String(i+1),url:'direction.html'});
        }

        cards[activeCardId-1]['active'] = true;
        tabs = new LayerGroup({
            id: "tab",
            layers: cards,
            onshow: function(event) {
                alert("123");
                if(endGame()){
                    return;
                };
                console.log("onshow start");
                var id = event['detail'];
                var element = event['srcElement'];

                doScore(id,element);
                updateCardDisplay(id,element);
            },
            left: 0,
            top: 100
        });


        main.layerInit(activeCardId,function(dom){
            console.log(" start "+activeCardId);

            updateCardDisplay(activeCardId,dom);
        });
    });

    function initCard(reInit) {
        cardNum=10;
        activeCardId = cardNum/2;
        imgNum = 6;

//        (typeof start == "undefined") && (start = 0);

        sessionStorage.setItem('score',0);
        sessionStorage.setItem('lastId',0);

        if(reInit) {
            level++;
        }else{
            level = 0;
        }

        if(!start) {
            start = 1;
//            alert("点击确定，开始游戏！");
        }

        releaseTime = 50000000;
        baseScore = 5;
        targetScore = baseScore + level*2;

        if(typeof tabs !== "undefined") {
            tabs.active(activeCardId);
        }

        $('#level').html(level+1);
        $('#time').html(releaseTime);
        $('#targetscore').html(targetScore);
        $('#score').html(sessionStorage.getItem('score'));


        if(typeof timeHandler == "undefined") {
            timeHandler = setInterval(updateTime,1000);
        }
    }

    function updateCardDisplay(id,element) {
        var dir;
        if(id == 1) {
            dir = 1;
        } else if(id == cardNum) {
            dir = -1;
        } else {
            dir = Math.random() > 0.5 ? 1 : -1;
        }

        sessionStorage.setItem('direction',dir);
        sessionStorage.setItem('lastId',id);

//        $("#dir"+dir,element).css("color","red");
//        $("#dir"+(-1*dir),element).css("color","black");

        var rightDirName= dir == 1 ? "right":"left";
        var wrongDirName= dir == 1 ? "left":"right";

        var indexSel = parseInt(Math.random() * imgNum);

        for(var i=0;i<imgNum;i++) {
            var imgSrc = i == indexSel ? "img/direction/"+rightDirName+"/"+parseInt(Math.random() * imgNum)+".jpg" :"img/direction/"+wrongDirName+"/"+i+".jpg" ;
            $("#img"+i,element).attr("src",imgSrc);
        }
    };

    function doScore(cardId,element){
        var lastId = sessionStorage.getItem('lastId');
        if(lastId == 0) {
            return;
        }

        var runDir = cardId - lastId >=0 ? 1 : -1;
        var rightDir = sessionStorage.getItem("direction");

        var score = sessionStorage.getItem('score');
        runDir == rightDir?score++:score--;
        sessionStorage.setItem('score',score);
        updateScoreDisplay();

    }

    function updateScoreDisplay() {
        var score = sessionStorage.getItem('score');
        $('#score').html(score);
        //...
    }

    function updateTime() {
        if(!endGame()) {
            releaseTime--;
            $('#time').html(releaseTime);
        }

    }

    function endGame() {
        //win
        if(targetScore <= sessionStorage.getItem("score")) {
            alert("You win!\n,点击确定，继续下一等级游戏！");
            initCard(1);

            return true;
        }

        //fail
        if(releaseTime <= 0 || sessionStorage.getItem("score") < 0) {
            alert("Game over!\n点击确定，重新开始游戏！");
            initCard();

            return true;
        }

        return false;
    }

});

