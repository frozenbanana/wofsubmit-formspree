// Config for UploadCare
UPLOADCARE_LOCALE = "en";
UPLOADCARE_TABS = "file url gdrive dropbox";
UPLOADCARE_PUBLIC_KEY = "395543331f07028dc5d9";

// auto expand textarea
function adjust_textarea(h) {
    h.style.height = "20px";
    h.style.height = (h.scrollHeight) + "px";
}

// Validate form
function validateContentNotEmpty() {
    content = document.forms["Form"]["file"].value;

    if (content == null || content == "") {
        alert("Please, Upload Video!");
        return false;
    }
}
UPLOADCARE_LOCALE_TRANSLATIONS = {
    // messages for widget
    errors: {
        'fileType': 'This type of files is not allowed.',
        'fileMinimalSize': 'File is too small',
        'fileMaximumSize': 'File is too large'
    },
    // messages for dialog’s error page
    dialog: {
        tabs: {
            preview: {
                error: {
                    'fileType': {
                        title: 'Title.',
                        text: 'Text.',
                        back: 'Back'
                    },
                    'fileMinimalSize': {
                        title: 'Title.',
                        text: 'Text.',
                        back: 'Back'
                    },
                    'fileMaximumSize': {
                        title: 'Title.',
                        text: 'Text.',
                        back: 'Back'
                    }
                }
            }
        }
    }
};
function fileTypeLimit(types) {
    types = types.split(' ');
    return function (fileInfo) {
        if (fileInfo.name === null) {
            return;
        }
        var extension = fileInfo.name.split('.').pop();
        if (types.indexOf(extension) == -1) {
            throw new Error("fileType");
        }
    };
}
function fileSizeLimit(min, max) {
    return function (fileInfo) {
        if (fileInfo.size === null) {
            return;
        }
        if (min && fileInfo.size < min) {
            throw new Error("fileMinimalSize");
        }
        if (max && fileInfo.size > max) {
            throw new Error("fileMaximumSize");
        }
    };
}
$ = uploadcare.jQuery;
$(function () {
    $('[role=uploadcare-uploader][data-file-types]').each(function () {
        var input = $(this);
        if (!input.data('minSize') && !input.data('maxSize')) {
            return;
        }
        var widget = uploadcare.Widget(input);
        widget.validators.push(fileTypeLimit(input.data('file-types')));
        widget.validators.push(fileSizeLimit(input.data('minSize'), input.data('maxSize')));
    });
});