# Countries population

- первый пункт: ошибка исправлена, приложение выводит в консоль суммарную популяцию в Африке. 
Из-за таймаута к моменту вызова callback цикл уже отрабатывал и переменная request переопределялась ('/population').
Теперь каждую итерацию вызывается анонимная функция и создадются три разных области видимости, каждая со своей переменной request.
Код почти оставлен без изменений, обработка response для удобства сделана отдельной функцией.
- второй пункт: приложение спрашивает название страны или города, а затем показывает численность населения. 
Почти всё переписано заново.