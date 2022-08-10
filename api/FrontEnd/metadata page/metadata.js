// desktop script
let fileInput = document.getElementById('file_input');
let chosenFile = document.getElementById('chosen-file');
let fileName = document.getElementById('file-name');


fileInput.onchange = () => {
	//for displaying the image
	let reader = new FileReader();
	reader.readAsDataURL(fileInput.files[0]);
	console.log(fileInput.files[0]);
	reader.onload = () => {
		chosenFile.setAttribute('src', reader.result);
	};
	var fullPath = document.getElementById('file_input').value;
	if (fullPath) {
		var startIndex = fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/');
		var filename = fullPath.substring(startIndex);
		if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
			filename = filename.substring(1);
		}

		// For displaying the name of the file on the fig-caption
		$('#file-name').append(`<b id='name-of-file'>${filename}</b>`);
	}
};

// mobile script
// Gaining access to the hamburger icon
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	navMenu.classList.toggle('active');
});

// mobile dropdown menu styles
const manageAccount = $('#manage-account');
const dropdownMenu = document.getElementById('#drop');

manageAccount.on('click', () => {
	manageAccount.classList.toggle('active');
	dropdownMenu.classList.toggle('active');
});

// looping through display metadata in order to display it in a column
let data = document.getElementById('display-metadata');
var Data = {};
Object.keys(data).forEach(function (key) {
	console.log('Key : ' + key + ', Value : ' + data[key]);
});

// share button script
const shareButton = document.querySelector('button');
const overlay = document.querySelector('.overlay');
const shareModal = document.querySelector('.share-now');

const title = window.document.title;
const url = window.document.location.href;

shareButton.addEventListener('click', () => {
	if (navigator.share) {
		navigator
			.share({
				title: `${title}`,
				url: `${url}`,
			})
			.then(() => {
				console.log('Thanks for sharing!');
			})
			.catch(console.error);
	} else {
		overlay.classList.add('show-share');
		shareModal.classList.add('show-share');
	}
});

overlay.addEventListener('click', () => {
	overlay.classList.remove('show-share');
	shareModal.classList.remove('show-share');
});

// Fitsum scripts
//adding event listener to the log in button

$("#file_input").on("click", () => {
	$("#name-of-file").remove();
	$(".metadata-key-value").remove();

	localStorage.removeItem('fileUrl');
	localStorage.removeItem('fileName');
})

$('#formD').submit(async function (e) {
	e.preventDefault();
	var formData = new FormData(this);

	localStorage.removeItem('fileUrl');
	localStorage.removeItem('fileName');

	//this is for showing the loading screen
	$('#loading').removeClass('hide');
	$.ajax({
		type: 'POST',
		headers: {
			token: `Bearer ${localStorage.getItem('accessToken')}`,
		},
		url: `/files/${localStorage.getItem('userId')}`,
		data: formData,
		processData: false,
		contentType: false,
		success: function (r) {
			console.log('result', r);
			var metadataObj = JSON.parse(r.metadata)
			for (var key in metadataObj) {
				$('#display-metadata').append(`<div class='metadata-key-value'><b>${key}</b>: ${metadataObj[key]}</div>`);
			}
			$('#display-metadata').append(`<p class='metadata-key-value'>${r.metadata}</p>`);
			localStorage.setItem('fileUrl', r.fileURL);
			localStorage.setItem('fileName', r.fileName);

			//this is for hiding the loading screen
			$('#loading').addClass('hide');
		},
		error: function (e) {
			$('#loading').addClass('hide');
			alert("Something went wrong!")
			localStorage.removeItem('fileUrl');
			localStorage.removeItem('fileName');
			$("#name-of-file").remove();
			$(".metadata-key-value").remove();
			window.location.href = "/SignIn Page/login.html";


			console.log('some error', e);
		},
	});
});

//link for downloading the file

$('#download-btn').on('click', () => {
	var fileUrl = localStorage.getItem('fileUrl');
	var fileName = localStorage.getItem('fileName');

	fetch(fileUrl)
		.then(resp => resp.blob())
		.then(blob => {
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.style.display = 'none';
			a.href = url;
			// the filename you want
			a.download = fileName;
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
			alert('your file has been downloaded!'); // or you know, something with better UX...
		})
		.catch(() => alert('Somethin went wrong!'));
});


// Logout Button

$('#logout').on('click', () => {
	localStorage.clear();
	window.location.href = "/SignIn Page/login.html";

})

// Displaying user email

$("#user-email-field").append(`<a href="#">${localStorage.getItem('username')} <i class="fa-solid fa-circle-user"></i></a>
										<p>${localStorage.getItem('email')}</p>`)