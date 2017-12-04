define(['./core'], function (core) {

    return function () {
        return new Promise(function (resolve, reject) {

            // create file input element
            var fileUploadElement = document.createElement('input');
            fileUploadElement.classList.add('file-upload');
            fileUploadElement.setAttribute('type', 'file');
            fileUploadElement.setAttribute('name', 'myFile');
            document.body.insertBefore(fileUploadElement, document.body.firstChild);
            fileUploadElement.addEventListener('change', function (event) {
                var files = event.target.files;
                var file = files[0];
                var reader = new FileReader();
                reader.onload = function (event) {
                    cleanup();
                    resolve({ name: file.name, data: event.target.result });
                };
                reader.readAsText(file);
            });
            fileUploadElement.click(); // does not work in chrome


            // cleanup
            var cleanup = function () {
                fileUploadElement.remove();
            };

            // hack for detecting cancel
            fileUploadElement.addEventListener('click', function () {
                document.body.onfocus = function () {
                    document.body.onfocus = null;
                    if (fileUploadElement.value.length === 0) {
                        cleanup();
                        reject('canceled by user');
                    }
                }
            });

        });
    }

});