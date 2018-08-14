function recognition(params, videoEleId) {
    var video = document.getElementById(videoEleId);
    var oldCanvas = document.getElementsByTagName('canvas');
    if(oldCanvas.length > 0) {
        oldCanvas[0].remove();
    }
    var canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "1000";
    canvas.width = video.offsetWidth;
    canvas.height = video.offsetHeight;
    document.body.appendChild(canvas);
    var ajax = new XMLHttpRequest();
    // 使用post请求
    ajax.open('post','/search');
    ajax.setRequestHeader("Accept", "*/*");
    ajax.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    ajax.send(JSON.stringify(params));
    ajax.onreadystatechange = function () {
        if (ajax.readyState==4 && ajax.status==200) {
            console.log(ajax.responseText);
            successSearch(JSON.parse(ajax.responseText).result.target)
        } else if (ajax.readyState==4 && ajax.status !=200) {
            alert(ajax.responseText)
        }
    }

    function successSearch(params) {
        console.log(params);
        let postureTypeNum = maxNumIndex(params['classes']);

        switch (postureTypeNum) {
            case 0: alert("识别结果是：其他 ");
            break;
            case 1: alert("识别结果是：叉腰 ");
            break;
            case 2: alert("识别结果是：举高");
            break;
            case 3: alert("识别结果是：平举");
            break;
            case 4: alert("识别结果是：L型");
            break;
            case 5: alert("识别结果是：叉腰举高");
            break;
            default: console.log('识别失败')
        }

    }

    function maxNumIndex(...arr) {
        let maxNum = Math.max(...arr);
        let maxIndex = 0;
        for(let i = 0; i < 6; i++) {
            if(maxNum == arr[i]) {
                maxIndex = i;
            }
        }
        console.log('最大数的坐标是：' + maxIndex);
        return maxIndex
    }
}