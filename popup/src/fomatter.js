//문자 제거
function removeChar(event) {
	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;
	if (keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39)
			return;
	else
			//숫자와 소수점만 입력가능
			event.target.value = event.target.value.replace(/[^-\.0-9]/g, "");
}
//콤마 찍기
	function comma(obj) {
			var regx = new RegExp(/(-?\d+)(\d{3})/);
			var bExists = obj.indexOf(".", 0);//0번째부터 .을 찾는다.
			var strArr = obj.split('.');
			while (regx.test(strArr[0])) {//문자열에 정규식 특수문자가 포함되어 있는지 체크
					//정수 부분에만 콤마 달기 
					strArr[0] = strArr[0].replace(regx, "$1,$2");//콤마추가하기
			}
			if (bExists > -1) {
					//. 소수점 문자열이 발견되지 않을 경우 -1 반환
					obj = strArr[0] + "." + strArr[1];
			} else { //정수만 있을경우 //소수점 문자열 존재하면 양수 반환 
					obj = strArr[0];
			}
			return obj;//문자열 반환
	}
//콤마 풀기
function uncomma(str) {
	str = "" + str.replace(/,/gi, ''); // 콤마 제거 
	str = str.replace(/(^\s*)|(\s*$)/g, ""); // trim()공백,문자열 제거 
	return (new Number(str));//문자열을 숫자로 반환
}
//input box 콤마달기
function inputNumberFormat(obj) {
	obj.value = comma(obj.value);
}
//input box 콤마풀기 호출
function uncomma_call(){
	var input_value = document.getElementById('input1');
	input_value.value = uncomma(input_value.value);
}
