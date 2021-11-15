window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});

const createInnerHtml = () => {
    const headerHTML = "<tr> <th></th> <th>Name</th> <th>Gender</th> <th>Department</th>"+
    "<th>Salary</th> <th>StartDate</th><th>Actions</th> </tr>";  
    let innerHTML = `${headerHTML}`;
    let empPayrollList = employeePayrollJson();
    for (const empPayrollData of empPayrollList) {
        innerHTML = `${innerHTML}
    
<tr>
<td>
    <img class="profile" src="  ${empPayrollData._profilePic}">
</td>
<td> 
   ${empPayrollData._name}
</td>
<td>  ${empPayrollData._gender}</td>
<td>
    ${getDeptHtml(empPayrollData._department)}
   
</td>
<td>  ${empPayrollData._salary}</td>
<td>  ${empPayrollData._startDate}</td>
<td>
    <img alt="delete" src="../Assets/icons/delete-black-18dp.svg">
    <img alt="edit" src="../Assets/icons/create-black-18dp.svg">
</td>
  </tr>  `;
    }
    document.querySelector("#display").innerHTML = innerHTML;
}
const employeePayrollJson = () =>{
    let empPayrollListLocal = [

        {
        
        _name: 'Narayan Mahadevan',
        
        _gender: 'male', 
        _department: [
        
        'Engineering',
        
        'Finance'
        ],
        
        _salary: '500000', _startDate: '29 Oct 2019',
        
        _note:''
        , _id: new Date().getTime(),
        
        _profilePic: '../assets/profile-images/Ellipse -2.png'
        
        },
         {
        
        _name: 'Amarpa Shashanka Keerthi Kumar',
        
        _gender: 'female', 
        _department: [
        
        'Sales'],
        
        _salary: '400000',
        
        _startDate: '29 Oct 2019', 
        _note: '',
        id: new Date().getTime()+ 1,
        
        profilePic: '../assets/profile-images/Ellipse -1.png'
         }
        ];
        
        return empPayrollListLocal;
}
const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class ='dept-label'>${dept}</div>`
    }
    return deptHtml;
}