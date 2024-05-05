﻿function getTinymceConfig() {
    return {
        content_css: ['/themes/Default/css/Theme.min.css'],
        selector: "textarea.html",
        verify_html: false,
        plugins: 'preview importcss searchreplace autolink autosave directionality code visualblocks visualchars fullscreen image link media codesample table charmap nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons filebrowser bootstrap pasteImage imagelocal docx2html',
        toolbar: 'undo redo blocks fontfamily fontsize blockquote forecolor backcolor bold italic underline strikethrough alignleft aligncenter alignright alignjustify link outdent indent  numlist bullist image filebrowser docx2html emoticons charmap media anchor ltr rtl codesample bootstrap imagelocal removeformat print fullscreen preview code',
        toolbar_sticky: false,
        toolbar_mode: 'sliding',
        height: 600,
        relative_urls: false,
        image_advtab: true,
        image_class_list: [
            { title: '无', value: '' },
            { title: '边框', value: 'img-thumbnail' }
        ],
        paste_data_images: true,
        images_upload_url: '/admin/Media/UploadBlob',
        imagetools_proxy: '/admin/Media/Proxy',
        images_reuse_filename: true,
        language: "zh_CN",
        table_default_attributes: {
            class: "table table-hover"
        },
        table_class_list: [
            { title: '无', value: 'table table-hover' },
            { title: '条纹', value: 'table table-hover table-striped' },
            { title: '边框', value: 'table table-hover table-bordered' },
            { title: '边框 + 条纹', value: 'table table-hover table-bordered table-striped' }
        ],
        codesample_languages: [
            { text: 'HTML/XML', value: 'markup' },
            { text: 'JavaScript', value: 'javascript' },
            { text: 'CSS', value: 'css' },
            { text: 'PHP', value: 'php' },
            { text: 'Ruby', value: 'ruby' },
            { text: 'Python', value: 'python' },
            { text: 'Java', value: 'java' },
            { text: 'C', value: 'c' },
            { text: 'C#', value: 'csharp' },
            { text: 'C++', value: 'cpp' }
        ],
        extended_valid_elements: "style,link[href|rel]",
        custom_elements: "style,link,~link",
        quickbars_insert_toolbar: false,
        quickbars_selection_toolbar: 'bold italic underline strikethrough quicklink h1 h2 h3 blockquote',
        skin: 'oxide',
        promotion: false
    };
}
function initEditor(selector) {
    $.post("/admin/Theme/GetCurrentTheme", function (theme) {
        var config = getTinymceConfig();
        config.content_css = [theme];
        config.selector = selector;
        tinymce.init(config);
    });
}
initEditor("textarea.html");
$(document).on("init-editor", function (e) {
    id = "editor-" + new Date().getTime();
    $(e.target).attr("id", id);
    initEditor("#" + id);
});