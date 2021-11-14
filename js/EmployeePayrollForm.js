let isUpdate = false;
let employeePayrollObj = [];
window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    name.addEventListener('input', function() {
        if (name.value.length == 0) {
            setTextValue('.text-error',"");
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;
            setTextValue('.text-error',"");
        } catch (e) {
            setTextValue('.text-error',e);
        }
    });

    const salary = document.querySelector('#salary');
    setTextValue('.salary-output',salary.value);
    salary.addEventListener('input', function() {
        setTextValue('.salary-output',salary.value);
    });

    const date = document.querySelector('#date');
    console.log(date);
    date.addEventListener('input',function(){
        let startDate = getInputValueById('#day')+" "+
                        getInputValueById('#month')+" "+
                        getInputValueById('#year');
        try{
            (new EmployeePayrollData()).startDate= new Date(Date.parse(startDate));
            setTextValue('.dates-error', "");
        }catch(e){
            setTextValue('.dates-error',e);
        }
    });
    checkforUpdate();
});

function save(event) {
    alert("save")
    event.preventDefault();
    event.stopPropagation();
    try {
       setEmployeePayrollObject();
       createAndUpdateStorage();
       resetButton();
       window.location.replace(site_Properties.home_page)
    } catch (e) {
        return;
    }
}

const setEmployeePayrollObject = () => {
    employeePayrollObj._name = getInputValueById('#name');
    employeePayrollObj._profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollObj._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollObj._department = getSelectedValues('[name=department]');
    employeePayrollObj._salary = getInputValueById('#salary');
    employeePayrollObj._note = getInputValueById('#notes');
    let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayrollObj._startDate = date;
}

function createAndUpdateStorage(employeePayrollData) {
    let employeePayrollList = JSON.parse(localStorage.
        getItem("EmployeePayrollList"));
    if(employeePayrollList){
        let empPayrollData = employeePayrollList.
        
        find(empData => empData._id == employeePayrollObj._id);
        if(!empPayrollData){
            employeePayrollList.push(createEmployeePayrollData());
        } else {
            const index = employeePayrollList
            .map(empData => empData._id).indexOf(empPayrollData._id);
            employeePayrollList.
            splice(index, 1, createEmployeePayrollData(empPayrollData._id));
        }
    } else {
        employeePayrollList = [createEmployeePayrollData()]
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList))
}

const createEmployeePayrollData = (id) => {
    let employeePayrollData = new EmployeePayrollData();
    if (!id) employeePayrollData.id = createNewEmployeeId();
    else employeePayrollData.id = id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
}

const setEmployeePayrollData = (employeePayrollData) => {
    try {
        employeePayrollData.name = employeePayrollObj._name;
    } catch(e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profilePic = employeePayrollObj._profilePic;
    employeePayrollData.gender = employeePayrollObj._gender;
    employeePayrollData.department = employeePayrollObj._department;
    employeePayrollData.salary = employeePayrollObj._salary;
    employeePayrollData.note = employeePayrollObj._note;
    try {
        employeePayrollData.startDate = 
        new Date(Date.parse(employeePayrollObj._startDate));
    } catch(e) {
        setTextValue('.date-error', e);
        throw e;
    }
    alert(employeePayrollData.toString());
}

const createNewEmployeeId = () => {
    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? 1 : (parseInt(empID)+1).toString();
    localStorage.setItem("EmployeeID", empID);
    return empID;
}

const createEmployeePayroll=()=>{
    let employeePayrollData=new EmployeePayrollData();
    try {
        employeePayrollData.name=getInputValueById('#name');
    } catch (error) {
        setTextValue('.text-error',e);
        throw e;
    }
    employeePayrollData.profilePic=getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender=getSelectedValues('[name=gender]').pop();
    employeePayrollData.department=getSelectedValues('[name=department]');
    employeePayrollData.salary=getSelectedValues('#salary');
    employeePayrollData.note=getInputValueById('#notes');
    const startDate=getInputValueById('#day')+" "+getInputValueById('#month')+" "+
                    getInputValueById('#year');
    employeePayrollData.startDate=new Date(Date.parse(startDate));
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

const getSelectedValues=(propertyValue)=>{
    let allItmes=document.querySelectorAll(propertyValue);
    let selItems=[];
    allItmes.forEach(item =>{
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
}

const getInputValueById=(id)=>{
    let value=document.querySelector(id).value;
    return value;
}

const getInputElementValue=(id)=>{
    let value=document.getElementById(id).value;
    return value;
}

const setForm = () => {
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=profile]',employeePayrollObj.profilePic);
    setSelectedValues('[name=gender]',employeePayrollObj._gender);
    setSelectedValues('[name=department]',employeePayrollObj._department);
    setValue('#salary', employeePayrollObj._salary);
    setTextValue('.salary-output', employeePayrollObj._salary)
    setValue('#notes', employeePayrollObj._notes);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
}

const setSelectedValues=(propertyValue,value)=>{
    let allItems=document.querySelectorAll(propertyValue);
    allItems.forEach(item =>{
        if(Array.isArray(value)){
            if(value.includes(item.value)){
                item.checked=true;
            }
        }
        else if(item.value === value)
            item.checked=true;
    });
}

function resetButton() {
    setValue('#name', '');
    setValue('#salary', '400000');
    setValue('#notes', '');
    setValue('#day', '1');
    setValue('#month', 'January');
    setValue('#year', '2021');
    setTextValue('.text-error', '');
    setTextValue('.dates-error', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
}

function setTextValue(id, value) {
    let element = document.querySelector(id);
    element.textContent = value;
}

function setValue(id, value) {
    let element = document.querySelector(id);
    element.value = value;
}

function unsetSelectedValues(propertyValue) {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

const checkforUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    console.log(employeePayrollJson)
    isUpdate = employeePayrollJson ? true : flase;
    if (!isUpdate)
        return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}