(function () {
    if (!$ || !$.validator) return;
    $.extend($.validator.messages, {
        required: "Это поле обязательно",
        remote: "Пожалуйста, введите правильное значение.",
        email: "Пожалуйста, введите корректный e-mail",
        url: "Пожалуйста, введите корректный URL.",
        date: "Пожалуйста, введите корректную дату.",
        dateISO: "Пожалуйста, введите корректную дату в формате ISO.",
        number: "Пожалуйста, введите число.",
        digits: "Пожалуйста, вводите только цифры.",
        creditcard: "Пожалуйста, введите правильный номер кредитной карты.",
        equalTo: "Пароли не совпадают!",
        extension: "Пожалуйста, выберите файл с правильным расширением.",
        maxlength: $.validator.format(
            "Пожалуйста, введите не больше {0} символов."
        ),
        minlength: $.validator.format(
            "Пожалуйста, введите не меньше {0} символов."
        ),
        rangelength: $.validator.format(
            "Пожалуйста, введите значение длиной от {0} до {1} символов."
        ),
        range: $.validator.format("Пожалуйста, введите число от {0} до {1}."),
        max: $.validator.format(
            "Пожалуйста, введите число, меньшее или равное {0}."
        ),
        min: $.validator.format(
            "Пожалуйста, введите число, большее или равное {0}."
        )
    });
    $.validator.addMethod(
        "email",
        function (value, element) {
            return (
                this.optional(element) ||
                /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,6}$/.test(value)
            );
        },
        "Введите корректный e-mail"
    );

    //дальнейший код для валидации форм

    const eventForm = $('#js-eventForm');
    if (eventForm.length) {
        eventForm.validate({
            errorElement: "span"
        });
    }

    function showToast(message, duration = 3000, type) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.remove("toast-success", "toast-error", "show");

        toast.classList.add(type === "success" ? "toast-success" : "toast-error", "show");

        setTimeout(() => {
            toast.classList.remove("toast-success", "toast-error", "show");
        }, duration);
    }


    const subscribeForm = $("#js-subscribeForm");
    if (subscribeForm.length) {
        const subscribeAction = subscribeForm.attr("action");
        const subscribeEmail = subscribeForm.find("#js-subscribeEmail");
        subscribeForm.validate({
            errorElement: "span",
            submitHandler: function (form, event) {
                event.preventDefault();
                $.ajax({
                    url: subscribeAction,
                    method: "POST",
                    data: {
                        email: subscribeEmail.val()
                    },
                    success: function () {
                        subscribeEmail.val("");
                        subscribeEmail.blur();
                        subscribeForm.find('[name="agree"]').prop('checked', false);
                        showToast("Вы успешно подписались на рассылку новостей", 3000, "success");
                    },
                    error: function () {
                        showToast("Что-то пошло не так, попробуйте еще раз", 3000, "error");
                    }
                });
            }
        });
    }

})();