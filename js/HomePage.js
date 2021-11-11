let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    empPayrollList = getEmployeeDataFromStorage();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
});
const getEmployeeDataFromStorage = () => {
    return localStorage.getItem("EmployeePayrollList") ?
        JSON.parse(localStorage.getItem("EmployeePayrollList")) : [];
}

const createInnerHtml = () => {
    const headerHTML = "<tr> <th></th> <th>Name</th> <th>Gender</th> <th>Department</th>"+
                       "<th>Salary</th> <th>StartDate</th><th>Actions</th> </tr>";
   
    const innerHTML = `${headerHTML}`;
    for (const empPayrollData of empPayrollList) {
        innerHTML = `${innerHTML}
    <tr>
    <td>
        <img class="profile" src="${empPayrollData._profilePic}">
    
    </td>
    <td> ${empPayrollData._name}</td>
    <td>${empPayrollData._gender}</td>
    <td>${getDeptHtml(empPayrollData._department)}</td>
    <td>${empPayrollData._salary}</td>
    <td>${stringifyDate(empPayrollData._startDate)}</td>
    <td>
        <img id="${empPayrollData._id}" onclick="remove(this)"
        alt="delete" src="../Assets/icons/delete-black-18dp.svg">
        <img id="${empPayrollData._id}" onclick="update(this)"
        alt="edit" src="../Assets/icons/create-black-18dp.svg">
    </td>
      </tr>  `;
    }

    document.querySelector("#display").innerHTML = innerHTML;
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class ='dept-label'>${dept}</div>`
    }
    return deptHtml;
}

const remove=(node)=>{
    const empPayrollData=empPayrollList.find(empData => empData._id==node.id);
    console.log(empPayrollList.find(empData => empData._id));
    console.log(node.id)
    if(!empPayrollData) return;
    const index=empPayrollList
                .map(empData => empData._id)
                .indexOf(empPayrollData._id);
    empPayrollList.splice(index,1);
    localStorage.setItem("EmployeePayrollList",JSON.stringify(empPayrollList));
    document.querySelector(".emp-count").textContent=empPayrollList.length;
    createInnerHtml();
}

const update = (data) => {
    let employeePayrollData = empPayrollList.find(empData => empData._id == data.id);
    if (!employeePayrollData)
        return;
    localStorage.setItem('editEmp', JSON.stringify(employeePayrollData));
    window.location.replace(site_Properties.add_emp_payroll_page);
}