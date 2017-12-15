/*
Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

    http://aws.amazon.com/apache2.0/

or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/*

  Set Javascript specific to the extension viewer view in this file.

*/
// setTotalScore('40');

//Setting the score and the background
function setTotalScore(score){

    if(score < 0 || score > 100){
        alert('Score is not valid. Please review your score.');
    }else{
        //Setting the background of score
        if(score >= 75){
            document.getElementById('total-score').style.backgroundColor = '#6c3';
            document.getElementById('overall-comments').innerHTML = 'Excellent';
        }else if (score >= 50){
            document.getElementById('total-score').style.backgroundColor = '#fc3';
            document.getElementById('overall-comments').innerHTML = 'Average';
        }else{
            document.getElementById('total-score').style.backgroundColor = '#f00';
            document.getElementById('overall-comments').innerHTML = 'Poor';
        }

        //Setting the score
        document.getElementById('total-score').innerHTML = score;
    }
}


function searchGame(gameName) {
	return $.ajax({
		url: '/info?search=' + encodeURIComponent(gameName),
		accepts: 'application/json',
	}).then(function(game) {
		setTotalScore(parseInt(game.total_rating));
		populateScreenshots(game);
	});
}

function populateScreenshots(game) {
	if (game.screenshots) {
		var carousel = $('#carousel > .carousel-inner');
		carousel.empty();
		var active = 'active'
		game.screenshots.forEach(function(screenshot) {
			var item = $(['<div class="carousel-item' + active + '">',
             '<img class="d-block img-fluid" src="' + screenshot.url + '">',
        	 '</div>'].join('\n'));
			carousel.append(item);
			active = '';
		});
		carousel.carousel();
	} else {

	}
}

searchGame('PlayerUnknown')
