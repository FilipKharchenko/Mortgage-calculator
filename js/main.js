/* Значения из текстовыx инпутов    */
const totalCost = document.getElementById('total-cost');
      anInitialFee = document.getElementById('an-initial-fee');
      creditTerm = document.getElementById('credit-term');
      maternityСapital = document.getElementById('maternity-capital');
      formInputCost = document.querySelector('.calculator__input-cost');
      formInputContribution = document.querySelector('.calculator__input-contribution');
      formInputAmount = document.querySelector('.calculator__input-amount');
      formInputPrecent = document.querySelector('.calculator__input-precent');
      formInputPayment = document.querySelector('.calculator__input-payment');
      formInputTerm = document.querySelector('.calculator__input-term');


/* Значения из range инпутов    */
const totalCostRange = document.getElementById('total-cost-range');
      anInitialFeeRange = document.getElementById('an-initial-fee-range');
      creditTermRange = document.getElementById('credit-term-range');
      maternityСapitalRange = document.getElementById('maternity-capital-range');

/* Итоговые значения */
const totalAmountOfCredit = document.getElementById('interest-rate');
      totalMonthlyPayment = document.getElementById('monthly-payment');
      totalCreditAmount = document.getElementById('credit-amount');
      totalCreditPeriod = document.getElementById('credit-period');
      
const checkboxFirst = document.getElementById('switch1');
const checkboxSecond = document.getElementById('switch2');
/* Все input */
const inputs = document.querySelectorAll('.calculator__input');
const inputsRange = document.querySelectorAll('.calculator__input-range')

const inputCapital = document.querySelector('.input__capital');

/* Кнопки с целью кредита */
const purposeOfLoanFirst = document.querySelector('.btn__top-first');
const purposeOfLoanSecond = document.querySelector('.btn__top-second');

/* Все кнопки с процентной ставкой */
const percentBtn = document.querySelectorAll('.btn__program');

/* Все кнопки банков */
const bankBtn = document.querySelectorAll('.bank__btn');
/* Активная кнопка по умолчанию */
const percentBtnActive = document.querySelector('.default');

/* Все input с типом number */
const inputsNumber = document.querySelectorAll("input[type='text']");

let totalCostSelector = document.getElementById('total-cost-selector');
let totalCostValue = document.getElementById('total-cost-value');
let totalCostProgress = document.getElementById('total-cost-progress');
let inputPrecent = document.querySelector('.input-precent');
let fromChange = document.querySelector('.from-change');
let beforeChange = document.querySelector('.before-change');
let regForSpan = /\B(?=(\d{3})+(?!\d))/g;
let totalCostNumber = Number(totalCost.value.replace(/\s+/g, ''));

const dateNow = () => {
    function pad(s, width, character) {
        return new Array(width - s.toString().length + 1).join(character) + s;
    }
}

dateNow()

const assignValue = () => {
    let totalCostRangeNumber = totalCostRange.value.replace(/[^0-9]/g, '');
        anInitialFeeRangeNumber = anInitialFeeRange.value.replace(/[^0-9]/g, '');
        maternityСapitalRangeNumber = maternityСapitalRange.value.replace(/[^0-9]/g, '');
        anInitialFeeRange.min = totalCostNumber / 100 * 10;

    if(totalCostRangeNumber) {
        totalCost.value=(parseInt(totalCostRangeNumber)).toLocaleString('ru-RU');
        anInitialFeeRangeNumber = anInitialFeeRange.min.replace(/[^0-9]/g, '');
        anInitialFee.value = (parseInt(anInitialFeeRangeNumber)).toLocaleString('ru-RU');
        formInputCost.value = totalCost.value + ' ₽';
    }

    if(anInitialFeeRangeNumber) {
        anInitialFeeRangeNumber = anInitialFeeRange.value.replace(/[^0-9]/g, '');
        anInitialFee.value=(parseInt(anInitialFeeRangeNumber)).toLocaleString('ru-RU');
        formInputContribution.value = anInitialFee.value + ' ₽'
    } 

    if(maternityСapitalRangeNumber) {
        maternityСapital.value=(parseInt(maternityСapitalRangeNumber)).toLocaleString('ru-RU');
    }

    anInitialFeeRange.max = (totalCostNumber / 100) * 97;
    anInitialFee.max = anInitialFeeRange.max;

    creditTerm.value = creditTermRange.value;
};

const assignValueRevers = () => {
    let totalCostNumber = Number(totalCost.value.replace(/\s+/g, ''));
    let anInitialFeeNumber = Number(anInitialFee.value.replace(/\s+/g, ''));
    let maternityCapitalNumber = Number(maternityСapital.value.replace(/\s+/g, ''));

    totalCostRange.value = totalCostNumber;
    
    anInitialFeeRange.value = anInitialFeeNumber;
    creditTermRange.value = creditTerm.value;
    maternityСapitalRange.value = maternityCapitalNumber;
    formInputCost.value = totalCost.value + ' ₽';
    formInputContribution.value = anInitialFee.value + ' ₽';

    anInitialFeeRange.max = (totalCostNumber / 100) * 97;
    anInitialFee.max = anInitialFeeRange.max;

    if (anInitialFee.max < 37500) {
        anInitialFee.max = 37500
    };
};

assignValue();
assignValueRevers()

const progressBar = () => {
    for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
        e.style.setProperty('--value', e.value);
        e.style.setProperty('--min', e.min == '' ? '0' : e.min);
        e.style.setProperty('--max', e.max == '' ? '100' : e.max);
        e.addEventListener('input', () => e.style.setProperty('--value', e.value));
    }
}
//  ограничиваем макимальное количество введеных цифр в инпутах
Array.from(inputsNumber).forEach(input => {
    const min = 0;
    const max = 100000000;


    input.addEventListener('input', (e) => {
        const value = Number(input.value.replace(/\s+/g, ''));
        if (value > max) { input.value = max }
        else if (value < min) { input.value = min }
    })
});

const creditPrograms = [
    {
        name: 'basic',
        precents: 9.9
    },
    {
        name: 'forIt',
        precents: 4.7
    },
    {
        name: 'support',
        precents: 6.7
    },
    {
        name: 'family',
        precents: 5.7
    },
    {
        name: 'military',
        precents: 9.3
    },
    {
        name: 'noFee',
        precents: 10.2
    },
];

const checkboxSecondChecked = () => {
    const inputCapital = document.querySelector('.input__capital-block');

    checkboxSecond.addEventListener('click', () => {
        inputCapital.classList.toggle('input__active');
        calculation(totalCost.value, anInitialFee.value, creditTerm.value, maternityСapital.value);
    });
};

const checkboxFirstChecked = () => {
    const bankSection = document.querySelector('.bank__container');

    checkboxFirst.addEventListener('click', () => {
        bankSection.classList.toggle('bank__active');

        for (let btn of bankBtn) {
            btn.classList.remove('bank__btn-active');
        };
    });
};

checkboxFirstChecked();
checkboxSecondChecked();

let currentPrecent = creditPrograms[0].precents;

purposeOfLoanFirst.addEventListener('click', () => {
    purposeOfLoanFirst.classList.add('btn__active');
    purposeOfLoanSecond.classList.remove('btn__active');
    currentPrecent = creditPrograms[0].precents;
    totalAmountOfCredit.innerHTML = `${currentPrecent} %`
    formInputPrecent.value = totalAmountOfCredit.innerHTML

    for(let btn of percentBtn) {
        btn.classList.remove('program__btn-active');
        btn.classList.remove('first-program');
    };

    percentBtnActive.classList.add('program__btn-active');
    calculation(totalCost.value, anInitialFee.value, creditTerm.value, maternityСapital.value);
});

purposeOfLoanSecond.addEventListener('click', () => {
    purposeOfLoanSecond.classList.add('btn__active');
    purposeOfLoanFirst.classList.remove('btn__active');
    currentPrecent = creditPrograms[0].precents;
    totalAmountOfCredit.innerHTML = `${currentPrecent} %`
    formInputPrecent.value = totalAmountOfCredit.innerHTML

    for(let btn of percentBtn) {
        btn.classList.remove('program__btn-active');
        btn.classList.add('first-program')
    };

    percentBtnActive.classList.add('program__btn-active');
    calculation(totalCost.value, anInitialFee.value, creditTerm.value, maternityСapital.value);
});

for(let btn of percentBtn) {
    btn.addEventListener('click', () => {
        for (let item of percentBtn) {
            item.classList.remove('program__btn-active');
        };

        btn.classList.add('program__btn-active');
        takeActivePercent(btn);
    });
};

for (let btn of bankBtn) {
    btn.addEventListener('click', () => {
        for (let item of bankBtn) {
            item.classList.remove('bank__btn-active');
        };

        btn.classList.add('bank__btn-active');
    })
}


const takeActivePercent = currentActive => {
    const dataAttrValue = currentActive.dataset.name;
    const currentProgram = creditPrograms.find( program => program.name === dataAttrValue );
    currentPrecent = currentProgram.precents;

    calculation(totalCost.value, anInitialFee.value, creditTerm.value, maternityСapital.value);
};

const totalCostValid = () => {
    if (Number(totalCost.value.replace(/\s+/g, '')) < 375000) {
        totalCost.value = 375000
        
    }
}

for (let input of inputsRange) {

    const fromInputChange = () => {
        fromChangeValue = anInitialFeeRange.value.replace(/[^0-9]/g, '');
        beforeChangeValue = anInitialFeeRange.max.replace(/[^0-9]/g, '');

        if (fromChangeValue.length == 8) {
            fromChange.innerHTML = 10 + ' млн. ₽'
        } else if (fromChangeValue.length == 7) {
            fromChange.innerHTML = fromChangeValue.replace(regForSpan, ',').slice(0, -5) + ' млн. ₽';
        } else if (fromChangeValue.length == 6) {
            fromChange.innerHTML = fromChangeValue.replace(regForSpan, ',').slice(0, -2) + ' тыс. ₽';
        } else if (fromChangeValue.length == 5) {
            fromChange.innerHTML = fromChangeValue.replace(regForSpan, ',').slice(0, -2) + ' тыс. ₽';
        }

        if (beforeChangeValue.length >= 7) {
            beforeChange.innerHTML = beforeChangeValue.replace(regForSpan, ',').slice(0, -5) + ' млн. ₽';
        } else if (beforeChangeValue.length == 6) {
            beforeChange.innerHTML = beforeChangeValue.replace(regForSpan, ',').slice(0, -2) + ' тыс. ₽';
        } else if (beforeChangeValue.length == 5) {
            beforeChange.innerHTML = beforeChangeValue.replace(regForSpan, ',').slice(0, -2) + ' тыс. ₽';
        }
    }

    const dataInputChange = () => {
        totalCostNumber = Number(totalCost.value.replace(/\s+/g, ''));
        anInitialFeeRangeNumber = anInitialFeeRange.value.replace(/[^0-9]/g, '');
        anInitialFeeRange.value = totalCostNumber / 100 * 10;
        anInitialFeeRangeNumber = anInitialFeeRange.min.replace(/[^0-9]/g, '');
        anInitialFee.value = (parseInt(anInitialFeeRangeNumber)).toLocaleString('ru-RU');
        anInitialFeeRange.value = anInitialFeeRange.min;
    }

    input.addEventListener('input', () => {
        totalCostValid();
        assignValue();

        if (input.id == 'total-cost-range') {
            dataInputChange();
            fromInputChange();
            inputPrecent.innerHTML = 10 + ' %';
        }

        if (input.id == 'an-initial-fee-range') {
            totalCostNumber = Number(totalCost.value.replace(/\s+/g, ''));
            anInitialFeeNumber = Number(anInitialFee.value.replace(/\s+/g, ''));
            precentNumber = Math.round((anInitialFeeNumber / totalCostNumber) * 100);

            if (precentNumber >= 100) {
                inputPrecent.innerHTML = 100 + ' %';
            } else {
                inputPrecent.innerHTML = precentNumber + ' %';
            }

            if (input.value < 100000) {
                input.step = 1000
            } else if (input.value >= 100000 && input.value < 1000000) {
                input.step = 12500
            } else if (input.value >= 1000000) {
                input.step = 25000
            }

            if (input.step > input.max - input.value) {
                input.step = input.max - input.value
            }
        }

        progressBar()
        calculation(totalCost.value, anInitialFee.value, creditTerm.value, maternityСapital.value);
    });

    input.addEventListener('change', () => {
        totalCostValid();
        assignValue();
        if (input.id == 'total-cost-range') {
            dataInputChange();
            fromInputChange();
        }
        calculation(totalCost.value, anInitialFee.value, creditTerm.value, maternityСapital.value);
    });
};

for(let input of inputs) {

    function inputValidate(input){
        const num = input.value.replace(/[^0-9]/g, '');
        if(num) {
            input.value=(parseInt(num)).toLocaleString('ru-RU');
        } else {
            input.value = '';
            input.placeholder = 'Введите сумму'
        }
    }

    input.addEventListener('click', () => {
        input.placeholder = 'Введите необходимую сумму'
        input.value = '';
        let anInitialFeeMin = totalCost.value.replace(/[^0-9]/g, '') / 10;
        let totalCostMin = totalCost.min.replace(/[^0-9]/g, '');

        creditTerm.placeholder = 'Минимальный срок: 1 год'
        anInitialFee.placeholder = `Минимальный взнос: ${(parseInt(anInitialFeeMin)).toLocaleString('ru-RU')} ₽`
        totalCost.placeholder = `Минимальная сумма: ${(parseInt(totalCostMin)).toLocaleString('ru-RU')} ₽`

        calculation(totalCost.value, anInitialFee.value, creditTerm.value, maternityСapital.value);
    });

    const fromInputChange = () => {
        fromChangeValue = anInitialFee.value.replace(/[^0-9]/g, '');
        beforeChangeValue = anInitialFee.max.replace(/[^0-9]/g, '');

        if (fromChangeValue.length == 8) {
            fromChange.innerHTML = 10 + ' млн. ₽'
        } else if (fromChangeValue.length == 7) {
            fromChange.innerHTML = fromChangeValue.replace(regForSpan, ',').slice(0, -5) + ' млн. ₽';
        } else if (fromChangeValue.length == 6) {
            fromChange.innerHTML = fromChangeValue.replace(regForSpan, ',').slice(0, -2) + ' тыс. ₽';
        } else if (fromChangeValue.length == 5) {
            fromChange.innerHTML = fromChangeValue.replace(regForSpan, ',').slice(0, -2) + ' тыс. ₽';
        }

        if (beforeChangeValue.length >= 7) {
            beforeChange.innerHTML = beforeChangeValue.replace(regForSpan, ',').slice(0, -5) + ' млн. ₽';
        } else if (beforeChangeValue.length == 6) {
            beforeChange.innerHTML = beforeChangeValue.replace(regForSpan, ',').slice(0, -2) + ' тыс. ₽';
        } else if (beforeChangeValue.length == 5) {
            beforeChange.innerHTML = beforeChangeValue.replace(regForSpan, ',').slice(0, -2) + ' тыс. ₽';
        }
    }

    const dataInputChange = () => {
        totalCostNumber = Number(totalCost.value.replace(/\s+/g, ''));
        anInitialFeeNumber = anInitialFee.value.replace(/[^0-9]/g, '');
        anInitialFee.value = totalCostNumber / 100 * 10;
        anInitialFeeNumber = anInitialFee.min.replace(/[^0-9]/g, '');
        anInitialFee.value = (parseInt(anInitialFee.value)).toLocaleString('ru-RU');
    }

    input.addEventListener('input', () => {

        inputValidate(input);
        assignValueRevers();

        if (input.id == 'total-cost') {
            dataInputChange();
            fromInputChange();
        }

        if (input.id == 'an-initial-fee') {
            totalCostNumber = Number(totalCost.value.replace(/\s+/g, ''));
            anInitialFeeNumber = Number(anInitialFee.value.replace(/\s+/g, ''));
            precentNumber = Math.round((anInitialFeeNumber / totalCostNumber) * 100);

            if(anInitialFeeNumber > anInitialFee.max) {
                input.value = anInitialFee.max.replace(/[^0-9]/g, '');
                input.value = parseInt(input.value).toLocaleString('ru-RU')
            }

            if (precentNumber >= 100) {
                inputPrecent.innerHTML = 97 + ' %';
            } else {
                inputPrecent.innerHTML = precentNumber + ' %';
            }
        }

        progressBar()
        calculation(totalCost.value, anInitialFee.value, creditTerm.value, maternityСapital.value);
    });

    input.addEventListener('change', () => {
        let totalCostNumber = Number(totalCost.value.replace(/\s+/g, ''));
        let anInitialFeeNumber = Number(anInitialFee.value.replace(/\s+/g, ''));

        if (input.id == 'total-cost') {
            dataInputChange();
            fromInputChange();
        }

        if (anInitialFeeNumber < totalCostNumber  / 100 * 10) {
            totalCostNumber = totalCost.value.replace(/[^0-9]/g, '') / 100 * 10;
            anInitialFee.value = parseInt(totalCostNumber).toLocaleString('ru-RU');
        }
        assignValueRevers();
        progressBar();
        totalCostValid();
        inputValidate(input);
        calculation(totalCost.value, anInitialFee.value, creditTerm.value, maternityСapital.value);
    });
};

const calculation = (totalCost = 0, anInitialFee = 0, creditTerm = 1, maternityСapital = 0) => {
   
    let totalCostNumber = Number(totalCost.replace(/\s+/g, ''));
    let anInitialFeeNumber = Number(anInitialFee.replace(/\s+/g, ''));
    let maternityCapitalNumber = Number(maternityСapital.replace(/\s+/g, ''));
    let monthlyPayment; // Ежемесячный платёж
    let lounAmount // Размер Кредита
    let interestRate = currentPrecent; // Процентная ставка
    let numberOfYers = creditTerm; // Количество лет
    let numberOfMonth = 12 * numberOfYers; // Количество месяцев

    if(!checkboxSecond.checked) {
        maternityCapitalNumber = 0;
    }

    if (totalCostNumber >= 375000) {
        lounAmount = totalCostNumber - anInitialFeeNumber - maternityCapitalNumber;
    } else {
        lounAmount = 0;
    }

    monthlyPayment = lounAmount * (interestRate / 1200) / (1 - Math.pow(1 + interestRate / 1200, -numberOfMonth));
    let monthlyPaymentArounded = Math.round(monthlyPayment);
    let stringYears;

    if(numberOfYers == 1) {
        stringYears = ' год';
    };

    if (numberOfYers > 1 && numberOfYers < 5) {
        stringYears = ' года';
    };

    if (numberOfYers > 4 || numberOfYers < 1) {
        stringYears = ' лет';
    };

   if (monthlyPaymentArounded < 0) {
        totalCreditAmount.innerHTML = `${0} ₽`;
        formInputAmount.value = totalCreditAmount.innerHTML;
        totalMonthlyPayment.innerHTML = `${0} ₽`;
        formInputPayment.value = totalMonthlyPayment.innerHTML;
   } else {

        totalCreditAmount.innerHTML = `${lounAmount} ₽`;
        totalMonthlyPayment.innerHTML = `${monthlyPaymentArounded} ₽`;
        totalAmountOfCredit.innerHTML = `${currentPrecent} %`;
        totalCreditPeriod.innerHTML = `${numberOfYers} ${stringYears}`;
        formInputPrecent.value = totalAmountOfCredit.innerHTML;
        formInputTerm.value = totalCreditPeriod.innerHTML;
        formInputAmount.value = totalCreditAmount.innerHTML;
        formInputPayment.value = totalMonthlyPayment.innerHTML;


        totalCreditAmount.innerHTML = (parseInt(totalCreditAmount.textContent) * 1)
        .toString()
        .split('')
        .reverse()
        .map((char, i) => char + (i % 3 ? '' : ' '))
        .reverse()
        .join('') + ' ₽';

        formInputAmount.value = totalCreditAmount.innerHTML;

        totalMonthlyPayment.innerHTML = (parseInt( totalMonthlyPayment.textContent) * 1)
        .toString()
        .split('')
        .reverse()
        .map((char, i) => char + (i % 3 ? '' : ' '))
        .reverse()
        .join('') + ' ₽';

        formInputPayment.value = totalMonthlyPayment.innerHTML;

        if(numberOfYers == '') {
            stringYears = 'лет'
            totalCreditPeriod.innerHTML = `${0} ${stringYears}`
            totalMonthlyPayment.innerHTML = `${lounAmount} ₽`;
            formInputTerm.value = totalCreditPeriod.innerHTML;
            formInputPayment.value = totalMonthlyPayment.innerHTML;
        };
    
   };
};

calculation(totalCost.value, anInitialFee.value, creditTerm.value, maternityСapital.value);

progressBar()

// Валидация формы
var select = document.querySelector("input[type='tel']");

var im = new Inputmask("+7 (999)-999-99-99");
im.mask(select);


let inputName = document.querySelector('.calculator__input-name'); // Получаем input
let regex = /[0-9-%]/g; // регулярка только цифры

let formBtn = document.querySelector('.calculator__btn');
formBtn.setAttribute("disabled", "disabled");

inputName.addEventListener('input', () => {
    if (inputName.value.length < 2 && select.inputmask.unmaskedvalue().length < 10) {
        formBtn.setAttribute("disabled", "disabled");
    } else if (inputName.value.length >= 2 && select.inputmask.unmaskedvalue().length === 10) {
        formBtn.removeAttribute("disabled", "disabled");
    };
});

select.addEventListener('input', () => {
    if (inputName.value.length < 2 && select.inputmask.unmaskedvalue().length < 10) {
        formBtn.setAttribute("disabled", "disabled");
    } else if (inputName.value.length >= 2 && select.inputmask.unmaskedvalue().length === 10) {
        formBtn.removeAttribute("disabled", "disabled");
    };
});


inputName.oninput = function(){
    this.value = this.value.replace(regex, '');
}

let validateForms = function(selector) {
  new window.JustValidate(selector, {
    rules: {
        name: {
          required: true,
          minLength: 2,
          maxLength: 50,
        },
        tel: {
          required: true,
          function: (name, value) => {
            const phone = select.inputmask.unmaskedvalue()
            return Number(phone) && phone.length === 10
          }
        },
      },
      
      messages: {
        name: {
          required: 'Как вас зовут?',
          minLength: 'Поле должно содержать минимум 2 символа'
        },
        tel: {
          required: 'Укажите ваш телефон'
        },
      },
    submitHandler: function() {
        document.querySelector('.calculator__input-name').value = '';
        document.querySelector('.calculator__input-tel').value = '';
    }
  });  
}  

validateForms('.form');
