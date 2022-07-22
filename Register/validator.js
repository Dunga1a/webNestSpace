// function validate()


function Validator(options) {

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {}

    function validate(inputElement, rule) {
        var errorMessage ;
        var erorrElement = getParent(inputElement, options.formGroupSelector).querySelector(options.erorrSelector);

        //Lấy ra các rule của selector
        var rules = selectorRules[rule.selector];


        // Lặp qua từng rule & kiểm tra
        // Nếu có lỗi thì dừng kiểm tra
        for(var i = 0; i < rules.length; i++) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );

                    break;
                default:
            errorMessage = rules[i](inputElement.value);

            }
            if(errorMessage) break;
        }

        if(errorMessage) {
            erorrElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid')
        }else {
            erorrElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid')

        }

        return !errorMessage;
    }

    var formElement = document.querySelector(options.form);
    // console.log(options.rules);

    if(formElement) {

        formElement.onsubmit = function(e) {
            e.preventDefault();

            var isFormValid = true;
            options.rules.forEach(function(rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if(!isValid) {
                    isFormValid = false;
                }
            });

            // if(isFormValid) {
            //     if (typeof options.onSubmit === 'function') {
            //         var enableInputs = formElement.querySelectorAll('[name]');

            //         var formValues = Array.from(enableInputs).reduce(function(values, input) {
                        
            //             switch(input.type) {
            //                 case 'radio':
            //                     values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
            //                     break;
            //                 case 'checkbox':
            //                     if (!input.matches(':checked')) return values;
            //                     if(!Array.isArray(values[input.name])){
            //                         values[input.name] = [];
            //                     }

            //                     values[input.name].push()
            //                     break;
            //                 case 'file':
            //                     values[input.name] = input.file;
            //                     break;
            //                 default:
            //                     values[input.name] = input.value;
            //             }
            //             return values;

            //         },{});

            //         options.onSubmit(formValues);
                    

            //     }else {
            //         console.log('có lỗi')
            //     }
            // }
        }

        // Lặp lại qua mỗi rule và xử lý lắng nghe sự kiện blur, input, ..)
        options.rules.forEach(function(rule) {

            //Lưu lại các rules cho mỗi input

            if(Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            }else {
                selectorRules[rule.selector] = [rule.test]
            }
            //selectorRules[rule.selector] = rule.test;
            var inputElements = formElement.querySelectorAll(rule.selector);
            // console.log(inputElements)

            Array.from(inputElements).forEach(function(inputElement) {
                if(inputElement) {
                    // Xử lí trường hợp blur ra ngoài
                    inputElement.onblur = function() {
                        validate(inputElement, rule)
                    }
    
                    // Xử lí khi nhập email
                    inputElement.oninput = function() {
                        var erorrElement = getParent(inputElement, options.formGroupSelector).querySelector(options.erorrSelector);
                        erorrElement.innerText = '';
                        getParent(inputElement, options.formGroupSelector).classList.remove('invalid')
                    }
                }
            });
            
            // console.log(erorrElement)
            
        })
    }
}
// Định nghĩa rules
// Nguyễn tắc của rules:
// 1. Khi có lỗi => Trả lỗi
// 2. khi đúng => trả về undefined
Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function(value) {
            return value ? undefined : "Vui lòng nhập trường này";
        }
    }
}

Validator.isEmail = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Vui lòng nhập email';
        }
    }
}

Validator.minLength = function(selector, min) {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ? undefined : `Vui lòng nhập ít nhất ${min} ký tự`; 
        }
    }
}

Validator.isConfirmed = function(selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function(value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
        }
    }
}