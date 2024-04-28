document.getElementById('profile-photo-upload').addEventListener('change', function(event) {
    var selectedFile = event.target.files[0]; 
    var selectedPhoto = document.getElementById('profile-selected-photo');

    var reader = new FileReader(); // Створюємо об'єкт FileReader

    reader.onload = function(event) {
        selectedPhoto.src = event.target.result; 
    };

    reader.readAsDataURL(selectedFile);
});
