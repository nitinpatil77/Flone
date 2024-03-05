window.onload=()=>{
    console.log('load');
    var currentUser=JSON.parse(localStorage.getItem('currentUser')) || [];
    console.log(currentUser);
    document.getElementById('user').innerHTML=currentUser[0].Username;

}