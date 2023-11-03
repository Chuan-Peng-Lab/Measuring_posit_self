jsPsych.github = (function () {
    var module = {};
  
    var owner = "";
    var repo = "";
    var path = "";
    var token = "";
    var header = {};
  
    module.config = function (config) {
      if (typeof (config) != "object") {
        return;
      }
      if(Object.keys(config).length < 4) {
        console.error("Error: There should be at least 4 parameters")
      }
  
      owner = config["owner"] ? config["owner"] : "";
      repo = config["repo"] ? config["repo"] : "";
      path = config["path"] ? config["path"] : "";
      token = config["token"] ? config["token"] : "";
      if(token.length < 1) { 
        header = {
          "Content-Type": "application/json"
        }
      } else { 
        header = {
          "Content-Type": "application/json",
          "Authorization": `token ${token}`
        }
      }
    }
    // Simplify uploading files
    module.upload = function(fileName, message, content) { 
      if (module.isFileExist(fileName)) {
        return module.update(fileName, message, content);
      } else { 
        return module.push(fileName, message, content);
      }
    }
    // new file upload
    module.push = function (fileName, message, content) {
      let formd = {
        message: message,
        content: btoa(content)
      };
      let res = new XMLHttpRequest();
      res.open(
        "PUT",
        `https://api.github.com/repos/${owner}/${repo}/contents${path}/${fileName}`,
        false
      );
      for (k in header) { 
        res.setRequestHeader(k, header[k]);
      }
      res.send(JSON.stringify(formd));
  
      if(res.status >= 400) { 
        return false;
      } else { 
        return true;
      }
    }
    // update file
    module.update = function (fileName, message, content) {
      let formd = {
        message: message,
        content: btoa(content),
        sha: module.getFileSha(fileName)
      };
      let res = new XMLHttpRequest();
      res.open(
        "PUT",
        `https://api.github.com/repos/${owner}/${repo}/contents${path}/${fileName}`,
        false
      )
      for (k in header) { 
        res.setRequestHeader(k, header[k]);
      }
      res.send(JSON.stringify(formd));
  
      if(res.status >= 400) { 
        return false;
      } else { 
        return true;
      }
    }
    // get last commit sha
    module.getLastSha = function () {
      let res = new XMLHttpRequest();
      res.open(
        "GET",
        `https://api.github.com/repos/${owner}/${repo}/commits`,
        false
      );
      for (k in header) { 
        res.setRequestHeader(k, header[k]);
      }
      res.send();
      return JSON.parse(res.responseText)[0].sha;
    }
    // get file id by the sha
    module.getFileSha = function(fileName) { 
      let res = new XMLHttpRequest();
      res.open(
        "GET",
        `https://api.github.com/repos/${owner}/${repo}/contents${path}/${fileName}`,
        false
      );
      for (k in header) { 
        res.setRequestHeader(k, header[k]);
      }
      res.send();
      // console.log(res);
      return JSON.parse(res.responseText)["sha"]
    }
    // delete file
    module.delete = function(fileName, message) { 
      let formd = {
        message: message,
        sha: module.getFileSha(fileName)
      };
      let res = new XMLHttpRequest();
      res.open(
        "DELETE",
        `https://api.github.com/repos/${owner}/${repo}/contents${path}/${fileName}`,
        false
      )
      for (k in header) { 
        res.setRequestHeader(k, header[k]);
      }
      res.send(JSON.stringify(formd));
  
      if(res.status >= 400) { 
        return false;
      } else { 
        return true;
      }
    }
    // Determine whether the file exists
    module.isFileExist = function(fileName) { 
      let res = new XMLHttpRequest();
      res.open(
        "GET",
        `https://api.github.com/repos/${owner}/${repo}/contents${path}/${fileName}`,
        false
      )
      for (k in header) { 
        res.setRequestHeader(k, header[k]);
      }
      res.send();
      if(res.status == 200) {
        return true;
      } else { 
        return false;
      }
    }
  
    module.getID = function(experID = "", length = 4, suffix = "") { 
      let name = `${experID ? experID : ""}`;
      let i = 1;
      while(module.isFileExist(name + i.toString().padStart(length, "0") + suffix + ".csv")) {
        i++
      }
      return i;
    }
  
    return module;
  })();
  