import React, { useState } from 'react';
import {employees} from './Data'
import './App.css'

// console.log(employees)

// const employees = Data;
function App() {
  const [teamMembers, setTeamMembers] = useState([]);

  const handleAdd = (id) => {
    const member = employees.find(emp => emp.id === id);
    setTeamMembers([...teamMembers, member]);
  };

  const handleRemove = (id) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  const calculateAverageAge = () => {
    if (!teamMembers.length) return 0;
    const totalAge = teamMembers.reduce((acc, member) => acc + member.age, 0);
    return (totalAge / teamMembers.length).toFixed(2);
  };

  const sortTeamByAge = () => {
    const sortedTeam = [...teamMembers].sort((a, b) => a.age - b.age);
    setTeamMembers(sortedTeam);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <EmployeeList employees={employees} teamMembers={teamMembers} onAdd={handleAdd} />
      <TeamMembers members={teamMembers} onRemove={handleRemove} averageAge={calculateAverageAge()} onSortAge={sortTeamByAge} />
    </div>
  );
}

function EmployeeList({ employees, teamMembers, onAdd }) {
  return (
    <div style={{border:'solid 2px black', padding:'1%', width:'20%'}}>
      <h2 style={{textAlign:'center'}}>Employees</h2>
      {employees.map(emp => (
        <div key={emp.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center' , opacity: teamMembers.some(m => m.id === emp.id) ? 0.4 : 1 }}>
          <p>{`${emp.first_name} ${emp.last_name} (Age: ${emp.age})`}</p>
          {!teamMembers.some(m => m.id === emp.id) && (
            <button style={{height:'30px'}} onClick={() => onAdd(emp.id)}>Add</button>
          )}
        </div>
      ))}
    </div>
  );
}

function TeamMembers({ members, onRemove, averageAge, onSortAge }) {
  return (
    <div style={{border:'solid 2px black', padding:'1%', width:'20%', display:'flex', flexDirection:'column', }}>
      <h2 style={{textAlign:'center'}}>Team Members</h2>
      <button style={{padding:'2.5%', borderRadius:'18px', width:'35%', alignSelf:'flex-end' }} onClick={onSortAge}>Sort by Age</button>
      <p>Average Age: {averageAge}</p>
      {members.map(member => (
        <div key={member.id}>
          <p>{`${member.first_name} ${member.last_name} (Age: ${member.age})`}</p>
          <button onClick={() => onRemove(member.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default App;

