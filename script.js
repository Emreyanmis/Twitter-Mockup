export async function getTweets(){
    let result = await axios({
        method: 'get',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
    }).then(response => {
        const $main = $('#main');
        $main.empty();
        
        var result = response.data;
        for(let i = 0; i < result.length; i++){
            var  twitter = $(`<div class = 'tweet' id='` + result[i].id + `'></div>`);
            if(result[i].isMine){
                twitter.append("<button class='delete' id = '" + result[i].id + "' type='button'>Delete</button>")
                twitter.append("<button class='edit' id = '" + result[i].id + "' type='button'>Edit</button>");
            }
            twitter.append(`<div class='name'>` + result[i].author + `</div>`);
            if(result[i].type == "retweet"){
                twitter.append(`<div class='pin'>Retweeted</div>`);
            }

            let textField = $("<div id='block" + result[i].id + "'></div>")
            if(result[i].type != "retweet"){
                textField.append(`<div id = "text` + result[i].id + `" class='body'>` + result[i].body + `</div>`);
            }else if(result[i].parent != undefined && result[i].parent.body != result[i].body){
                textField.append(`<div id = "text` + result[i].id + `" class='rebody'>` + result[i].body + `</div>`);
            } else if(result[i].parent == undefined){
                textField.append(`<div id = "text` + result[i].id + `" class='body'>` + result[i].body + `</div>`);
            } 
            twitter.append(textField);

            if(result[i].type == "retweet" && result[i].parent != undefined){
                twitter.append(`<div id = "retext` + result[i].id + `" class='retweetText'>` + `<div class='name'>` + result[i].parent.author + `</div>` + `<div class="body">` + result[i].parent.body + `</div></div>`);
            }
            twitter.append(`<textarea id = "re` + result[i].id + `" rows="1" cols="50" placeholder="Reply or Retweet Tweet"></textarea>
                            <div class='inline retweets'>` + result[i].retweetCount + `</div>
                            <button type='button' id = '` + result[i].id + `' class='inline inlineButton retweetButton'>Retweet</button>
                            <div class='inline likes'>` + result[i].likeCount + `</div>`);

            if(result[i].isLiked){
                twitter.append(`<button type='button' id = '` + result[i].id + `' class='inline inlineButton unlikeButton'>Liked</button>`);
            } else {
                twitter.append(`<button type='button' id = '` + result[i].id + `' class='inline inlineButton likeButton'>Like</button>`);
            }
            
            twitter.append(`<div class='inline replies'>` + result[i].replyCount + `</div>
                            <button type='button' id = '` + result[i].id + `' class='replyButton'>Reply</button>`);

            $main.append(twitter);
        }
    });
    return result;
};

export async function getMoreTweets(a){
    var result = await axios({
        method: 'get',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
    }).then(response => {
        const $main = $('#main');
        var result = response.data;
        for(var i = 0; i < result.length; i++){
            var twitter = $(`<div class = 'tweet' id='` + result[i].id + `'></div>`);
            if(result[i].isMine){
                twitter.append("<button class='edit' id = '" + result[i].id + "' type='button'>Edit</button>");
                twitter.append("<button class='delete' id = '" + result[i].id + "' type='button'>Delete</button>")
            }
            twitter.append(`<div class='name'>` + result[i].author + `</div>`);
            if(result[i].type == "retweet"){
                twitter.append(`<div class='pin'>Retweeted</div>`);
            }

            var textField = $("<div id='block" + result[i].id + "'></div>")
            if(result[i].type != "retweet"){
                textField.append(`<div id = "text` + result[i].id + `" class='body'>` + result[i].body + `</div>`);
            } else if(result[i].parent == undefined){
                textField.append(`<div id = "text` + result[i].id + `" class='body'>` + result[i].body + `</div>`);
            } else if(result[i].parent != undefined && result[i].parent.body != result[i].body){
                textField.append(`<div id = "text` + result[i].id + `" class='rebody'>` + result[i].body + `</div>`);
            }

            twitter.append(textField);

            if(result[i].type == "retweet" && result[i].parent != undefined){
                twitter.append(`<div id = "retext` + result[i].id + `" class='retweetText'>` + `<div class='name'>` + result[i].parent.author + `</div>` + `<div class="body">` + result[i].parent.body + `</div></div>`);
            }
            twitter.append(`<textarea id = "re` + result[i].id + `" rows="10" cols="50" placeholder="Reply Tweet"></textarea>
                            <div class='inline retweets'>` + result[i].retweetCount + `</div>
                            <button type='button' id = '` + result[i].id + `' class='inline inlineButton retweetButton'>Retweet</button>
                            <div class='inline likes'>` + result[i].likeCount + `</div>`);

            if(result[i].isLiked){
                twitter.append(`<button type='button' id = '` + result[i].id + `' class='inline inlineButton unlikeButton'>Liked!</button>`);
            } else {
                twitter.append(`<button type='button' id = '` + result[i].id + `' class='inline inlineButton likeButton'>Like</button>`);
            }
            
            twitter.append(`<div class='inline replies'>` + result[i].replyCount + `</div>
                            <button type='button' id = '` + result[i].id + `' class='replyButton'>Reply</button>`);
            $main.append(twitter);
        }
    });
    return result;
};

export async function likeTweet(){
    var id = $(this).attr("id");
    const result = await axios({
        method: 'put',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/' + id + '/like',
        withCredentials: true,
    });
    getTweets();
    return result;
}

export async function unlikeTweet(){
    let id = $(this).attr("id");
    const result = await axios({
        method: 'put',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/' + id + '/unlike',
        withCredentials: true,
      });
    getTweets();
    return result;
}

export async function newTweet(){
    const result = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
          body: $("#newInput").val()
        },
    });
    getTweets();
    const $sider = $('#sider');
    $sider.empty();
    let newTweetPost = $('<button id="newTweetButton" type = "button">Create a new Tweet!</button>');
    $sider.append(newTweetPost);
    return result;
};

export async function reTweet(){
    var result;
    var id = $(this).attr("id");
    var body;
    var parent = await axios({
        method: 'get',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/' + id,
        withCredentials: true,
    });
    if($("#re" + id).val().length == 0){
        body = parent.data.body;
    } else {
        body = $("#re" + id).val()
    }
    result = await axios({
            method: 'post',
            url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
            withCredentials: true,
            data: {
              "type": "retweet",
              "parent": id,
              "body": body
            },
        });
    getTweets();
    return result;
}

export async function replyTweet(){
    var id = $(this).attr("id");
    const result = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
          "type": "reply",
          "parent": id,
          "body": $("#re" + id).val()
        },
    });
    getTweets();
    return result;
}

export async function editTweet(){
    var id = $(this).attr("id");
    var $textBox = $("#text" + id);
    var text = $textBox.html();
    $textBox.remove();
    var box
    if(text != undefined){
        box = $(`<textarea id = "textbox` + id + `" rows="4" cols="50">` + text + `</textarea>`);
    } else {
        box = $(`<textarea id = "textbox` + id + `" rows="4" cols="50" placeholder="add to your retweet"></textarea>`);
    }
    $("#block" + id).append(box);
    $("#block" + id).append("<button type='button' class='saveButton' id='" + id + "'>Save</button>");
    $(this).remove();
}

export async function saveTweet(){
    var body;
    var id = $(this).attr("id");
    if($("#textbox" + id).val().length == 0){
        body = " ";
    } else {
        body = $("#textbox" + id).val();
    }
    const result = await axios({
        method: 'put',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/' + id,
        withCredentials: true,
        data: {
          body: body
        },
    });
    getTweets();
    return result;
}

export async function deleteTweet(){
    var id = $(this).attr("id");
    const result = await axios({
        method: 'delete',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/' + id,
        withCredentials: true,
      });
    getTweets();
    return result;
}

export async function createTweet(){
    $(this).remove();
    let newTweetPost = $(`<textarea id = "newInput" rows="4" cols="50" placeholder="write your tweet"></textarea><br>
    <button id="new" type="button">Post</button>`);
    const $sider = $('#sider');
    $sider.append(newTweetPost);
}


$(document).ready(() => {
    const $root = $('#root');
    var main = $("<div id='main'></div>");
    $root.append(main);
    var sider = $("<div id='sider'></div>");

    var post = $('<button id="newTweetButton" type = "button">What do you want to talk about?</button>');
    sider.append(post);
    $root.append(sider);
    $root.on('click', ".likeButton", likeTweet);
    $root.on('click', ".unlikeButton", unlikeTweet);
    $root.on('click', ".retweetButton", reTweet);
    $root.on('click', ".replyButton", replyTweet);
    $root.on('click', ".edit", editTweet);
    $root.on('click', ".delete", deleteTweet);
    $root.on('click', ".saveButton", saveTweet);
    $root.on('click', "#new", newTweet);
    $root.on('click', "#newTweetButton", createTweet);

    $(window).scroll(function(){
    });
    getTweets();
});
