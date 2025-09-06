        const yearDropdownItems = document.querySelectorAll('#yearDropdown ~ .dropdown-menu a');
        const yearTextSpan = document.getElementById('yearText');
        const methodDropdownItems = document.querySelectorAll('.dropdown-menu a[data-method]');
        const methodTextSpan = document.getElementById('methodText');
        const percentageInputGroup = document.getElementById('percentageInputGroup');
        const fractionInputGroup = document.getElementById('fractionInputGroup');
        const diyatQatlInputGroup = document.getElementById('diyatQatlInputGroup');
        const diyatAazaInputGroup = document.getElementById('diyatAazaInputGroup');
        const subLayerTextSpan = document.getElementById('subLayerTextSpan');
        const subLayerDropdownItems = document.querySelectorAll('#diyatQatlInputGroup .dropdown-menu a');
        const diyatAazaSubLayerTextSpan = document.getElementById('diyatAazaSubLayerTextSpan');
        const diyatAazaSubLayerDropdownItems = document.querySelectorAll('#diyatAazaInputGroup .dropdown-menu a');
        const calculateBtn = document.getElementById('calculateBtn');
        const numberInput = document.getElementById('numberInput');
        const numeratorInput = document.getElementById('numerator');
        const denominatorInput = document.getElementById('denominator');
        const resultContainer = document.getElementById('resultContainer');
        const resultText = document.getElementById('resultText');

        // مقدار پیش فرض برای سال 1404
        let selectedDiyahValue = 1600000000;

        // پنهان کردن گروه های قبلی
        function hideAllInputGroups() {
            percentageInputGroup.classList.add('d-none');
            fractionInputGroup.classList.add('d-none');
            diyatQatlInputGroup.classList.add('d-none');
            diyatAazaInputGroup.classList.add('d-none');
            resultContainer.classList.add('d-none');
        }

        // بروزرسانی مبلغ دیه
        yearDropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault(); 
                const selectedYear = this.textContent.trim();
                selectedDiyahValue = parseFloat(this.getAttribute('data-diyah'));
                yearTextSpan.textContent = selectedYear; 
                resultContainer.classList.add('d-none');
            });
        });

        
        methodDropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const selectedMethod = this.getAttribute('data-method');
                const selectedText = this.textContent.trim();

                methodTextSpan.textContent = selectedText;
                hideAllInputGroups(); 

                // نمایش ورودی مرتبط با روش انتخاب‌شده
                switch (selectedMethod) {
                    case 'percent':
                        percentageInputGroup.classList.remove('d-none');
                        break;
                    case 'fraction':
                        fractionInputGroup.classList.remove('d-none');
                        break;
                    case 'diyat-qatl':
                        diyatQatlInputGroup.classList.remove('d-none');
                        break;
                    case 'diyat-aaza':
                        diyatAazaInputGroup.classList.remove('d-none');
                        break;
                    default:
                        percentageInputGroup.classList.remove('d-none');
                        break;
                }
            });
        });

        // دیه قتل 
        subLayerDropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                subLayerTextSpan.textContent = this.textContent.trim();
                resultContainer.classList.add('d-none'); 
            });
        });

        // جنایت
        diyatAazaSubLayerDropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                diyatAazaSubLayerTextSpan.textContent = this.textContent.trim();
                resultContainer.classList.add('d-none');
            });
        });


        // سال
        yearDropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedYear = this.textContent.trim();
            selectedDiyahValue = parseFloat(this.getAttribute('data-diyah'));
        
            yearTextSpan.textContent = selectedYear; 
            
            document.getElementById("yearValue").textContent =
                selectedDiyahValue.toLocaleString('fa-IR') + " ریال";
        
            resultContainer.classList.add('d-none');
            });
        });
        
        calculateBtn.addEventListener('click', function() {
            if (!percentageInputGroup.classList.contains('d-none')) {
                const percentage = parseFloat(numberInput.value);
                if (!isNaN(percentage) && selectedDiyahValue) {
                    const result = (percentage / 100) * selectedDiyahValue;
                    resultText.textContent = `مبلغ دیه: ${result.toLocaleString('fa-IR')} ریال`;
                    resultContainer.classList.remove('d-none');
                } else {
                    resultText.textContent = 'لطفا درصد را به صورت یک عدد وارد کنید.';
                    resultContainer.classList.remove('d-none');
                }
            }

            else if (!fractionInputGroup.classList.contains('d-none')) {
                const numeratorValue = parseFloat(numeratorInput.value);
                const denominatorValue = parseFloat(denominatorInput.value);

                if (!isNaN(numeratorValue) && !isNaN(denominatorValue) && denominatorValue !== 0 && selectedDiyahValue) {
                    const result = (numeratorValue / denominatorValue) * selectedDiyahValue;
                    resultText.textContent = `مبلغ دیه: ${result.toLocaleString('fa-IR')} ریال`;
                    resultContainer.classList.remove('d-none');
                } else {
                    resultText.textContent = 'لطفا صورت و مخرج کسر را به درستی وارد کنید و مطمئن شوید که مخرج صفر نیست.';
                    resultContainer.classList.remove('d-none');
                }
            }
            // ورودی های قفل شده 
            else if (!diyatQatlInputGroup.classList.contains('d-none') || !diyatAazaInputGroup.classList.contains('d-none')) {
                resultText.textContent = 'درحال حاضر دسترسی به این بخش ممکن نمیباشد.';
                resultContainer.classList.remove('d-none');
            }
        });