import axios from "axios";

const server = "http://localhost:3001/"
const headers = {
  'Authorization': 'token'
}

export default {
    getAllSkills: function() {
      return axios.get(server + "getskill");
    },
    addSkills: function(data) {
      return axios.post(server + "addskill", data)
    },
    addUserSkills: function(data) {
      console.log(data)
      return axios.post(server + "adduserskill", data, { withCredentials: true })
    },
    getAllUserSkills: function() {
      return axios.get(server + "getuserskill");
    },
    getAllUsers: function() {
      return axios.get(server + "allusers");
    },
    delUserSkills: function(data) {
      console.log(data)
      return axios.delete(server + "deluserskill", {data, headers:{Authorization: "token"}});
    },
    getUskills: function(){
      return axios.get(server + "getuskill", { withCredentials: true });
    },
    addArea: function(data) {
      return axios.post(server + "addarea", data)
    },
    getAllAreas: function() {
      return axios.get(server + "getarea")
    },
    getYourEmployee: function() {
      return axios.get(server + "youremployee")
    },
    getSkillUserSkill: function() {
      return axios.get(server + "skilluserskill")
    },
    delSkill: function(data) {
      console.log(data)
      return axios.delete(server + "delskill", {data, headers:{Authorization: "token"}});
    },
    delArea: function(data) {
      console.log(data)
      return axios.delete(server + "delarea", {data, headers:{Authorization: "token"}});
    },
  };