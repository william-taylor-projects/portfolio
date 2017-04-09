
const formidable = require('formidable');
const logger = require('./logger.js');
const path = require("path");
const fs = require("fs");

const express = require('express');
const router = express.Router();

class DashboardApi {
  constructor() {
    this.data = {
      username: "",
      password: "",
      url: ""
    }
  }

  getProgramsByFolder(folder, callback) {
    fs.readFile(`./public/json/apps/${folder}/apps.json`, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        callback([]);
      } else {
        var json = JSON.parse(data.toString().replace(/^\uFEFF/, ''));
        callback(json.apps);
      }
    });
  }

  getAllPrograms(req, res) {
    const response = {};
    this.getPrograms("web", data => {
      response["webapps"] = data;
      this.getPrograms("android", data => {
        response["androidapps"] = data;
        this.getPrograms("desktop", data => {
          response["desktopapps"] = data;
          res.json(response);
        });
      });
    });
  }

  login(req, res) {
    const body = req.body;

    if(body.username == this.data.username && body.password == this.data.password) {
      res.json({ url: this.data.url, msg: "Login Successful", login: true });
    } else {
      res.json({ url: "", msg: "Login Failed", login: false });
    }
  }

  getPrograms(req, res) {
    this.getProgramsByFolder(req.body.type, data => {
      res.json({"apps": data });
    });
  }

  getLibs(req, res) {
    this.getLibs(req.body.type, data => {
      res.json({"libs": data});
    });
  }


  use(express, name) {
    express.use(name, router);
    logger.printSuccess(`Binded Dashboard API to ${name}`);
  }

  readIdeas(callback) {
    fs.readFile('./public/json/ideas/ideas.json', 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        callback([]);
      } else {
        const json = JSON.parse(data.toString().replace(/^\uFEFF/, ''));
        callback(json.ideas);
      }
    });
  }

  getIdeas(req, res) {
    this.readIdeas(ideas => {
      res.json({"ideas": ideas });
    });
  }

  getLibsByFolder(folder, callback) {
    fs.readFile(`./public/json/libs/${folder}/libs.json`, 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        callback([]);
      } else {
        let json = JSON.parse(data.toString().replace(/^\uFEFF/, ''));
        callback(json.libs);
      }
    });
  }

  uploadIdea(req, res) {
    if(req.body.title && req.body.tags && req.body.text) {
      self.getIdeas(ideas => {
        ideas.push({
          title: req.body.title,
          tags: req.body.tags,
          body: req.body.text,
          ID: Date.now()
        });

        const filename = 'public/json/ideas/ideas.json';
        const data =  JSON.stringify({ "ideas": ideas });

        fs.writeFile(filename, data, (err, data) => {
          if(err) {
            res.json({"msg": JSON.stringify(data) });
          } else {
            res.json({"msg": "Uploaded idea"});
          }
        });
      });
    } else {
      res.json({"msg": "Invalid params"});
    }
  }

  removeIdea(req, res) {
    if(req.body.ID) {
      this.getIdeas(ideas => {
        const index = -1;

        for(let i = 0; i < ideas.length; i++) {
          if(Number(ideas[i].ID) == Number(ID)) {
            index = i;
            break;
          }
        }

        if(index != -1) {
          ideas.splice(index, 1);

          const filename = 'public/json/ideas/ideas.json';
          const data = JSON.stringify({ "ideas": ideas || [] });
          fs.writeFile(filename, data, (err, data) => {
            if(err) {
              res.json({"msg": JSON.stringify(data) });
            } else {
              res.json({"msg": "Removed idea"});
            }
          });
        }
      });
    } else {
      res.json({"msg": "Invalid params"});
    }
  }

  setup(json) {
    this.data.username = json.dashboard.username;
    this.data.password = json.dashboard.password;
    this.data.url = json.dashboard.url;

    router.post('/uploadBlogImage/', (req, res) => {
      const form = new formidable.IncomingForm();
      form.encoding = 'utf-8';
      form.uploadDir = __dirname.substring(0, __dirname.lastIndexOf("/") + 1) + "public/json/blogs/images/";
      form.keepExtensions = true;
      form.parse(req, (err, fields, files) => {
        if(err) {
          console.log(err);
        } else {
          const fullPath = files.file.path;
          const directPath = fullPath.substring(0, fullPath.lastIndexOf("/")+1);
          const ID = "blog-img-" + Date.now().toString() + path.extname(fullPath);
          const URL = "/json/blogs/images/" + ID;
          const newPath = directPath + ID;

          fs.rename(files.file.path, newPath);

          res.json({"ID": URL, "msg": "Image upload success"});
        }
      });
    });

    router.post('/getPrograms/', (req, res) => this.getPrograms(req, res));
    router.post('/deleteBlog/', (req, res) => this.deleteBlog(req, res));
    router.post('/saveBlog/', (req, res) => this.saveBlog(req, res));
    router.post('/uploadBlog/', (req, res) => this.uploadBlog(req, res));
    router.post('/getBlog/', (req, res) => this.getBlog(req, res));
    router.post('/getLibs/', (req, res) => this._getLibs(req, res));
    router.post('/login/', (req, res) => this.login(req, res));
    router.post('/uploadIdea/', (req, res) => this.uploadIdea(req, res));
    router.post('/removeIdea/', (req, res) => this.removeIdea(req, res));

    router.get('/getAllPrograms/', (req, res) => this._getAllPrograms(req, res));
    router.get('/getAllLibs/', (req, res) => this.getAllLibs(req, res));
    router.get('/getIdeas/', (req, res) => this.getIdeas(req, res));
    router.get('/getBlogs/', (req, res) => this.getBlogs(req, res));

    logger.printSuccess("Full Dashboard API attached");
  }


  getAllLibs(req, res) {
    const response = {};
    this.getLibs("fav", data => {
      response["fav_libs"] = data;
      this.getLibs("my", data => {
        response["own_libs"] = data;
        res.json(response);
      });
    });
  }

  readBlogs(callback) {
    fs.readFile('./public/json/blogs/json/blogs.json', 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        callback([]);
      } else {
        var json = JSON.parse(data.toString().replace(/^\uFEFF/, ''));
        callback(json.blogs);
      }
    });
  }

  getBlogs(req, res) {
    this.readBlogs(data => res.json(data));
  }

  getBlog(req, res) {
    let returnValue = {};
    this.readBlogs(data => {
      for(let i = 0; i < data.length; i++) {
        if(Number(data[i].ID) == Number(req.body.ID)) {
          returnValue = data[i];
          break;
        }
      }

      res.json(returnValue);
    });
  }

  saveBlog(req, res) {
    const body = req.body;
    if(body.ID && body.html && body.title && body.author && body.forward && body.timestamp) {
      this.readBlogs(blogs => {
        for(let i = 0; i < blogs.length; i++) {
          if(Number(blogs[i].ID) == Number(body.ID)) {
            blogs[i].title = body.title;
            blogs[i].author = body.author;
            blogs[i].forward = body.forward;
            blogs[i].timestamp = body.timestamp;
            blogs[i].html = body.html;
            break;
          }
        }

        const filename = 'public/json/blogs/json/blogs.json';
        const data =  JSON.stringify({ "blogs": blogs });

        fs.writeFile(filename, data, function (err, data) {
          if(err) {
            res.json({"msg": JSON.stringify(data) });
          } else {
            res.json({"msg": "Saved blog"});
          }
        });
      })
    } else {
      res.json({"msg": "Invalid params"});
    }
  }

  uploadBlog(req, res) {
    const body = req.body;
    if(body.html && body.title && body.author && body.forward && body.timestamp && body.image) {
      this.readBlogs(blogs => {
        blogs.push({
          title: body.title,
          author: body.author,
          forward: body.forward,
          timestamp: body.timestamp,
          image: body.image,
          html: body.html,
          ID: Date.now().toString()
        });

        const filename = 'public/json/blogs/json/blogs.json';
        const data =  JSON.stringify({ "blogs": blogs });

        fs.writeFile(filename, data, function (err, data) {
          if(err) {
            res.json({"msg": JSON.stringify(data) });
          } else {
            res.json({"msg": "Uploaded blog"});
          }
        });
      });
    } else {
      res.json({"msg": "Invalid params"});
    }
  };

  deleteBlog(req, res) {
    if(req.body.ID) {
      this.readBlogs(blogs => {
        let index = -1;
        for(let i = 0; i < blogs.length; i++) {
          if(Number(blogs[i].ID) == Number(req.body.ID)) {
            var filePath = './public/'+ blogs[i].image;
            fs.unlinkSync(filePath);
            index = i;
            break;
          }
        }

        if(index != -1) {
          blogs.splice(index, 1);

          const filename = 'public/json/blogs/json/blogs.json';
          const data = JSON.stringify({ "blogs": blogs });

          fs.writeFile(filename, data, function (err, data) {
            if(err) {
              res.json({"msg": JSON.stringify(data) });
            } else {
              res.json({"msg": "Removed idea"});
            }
          });
        } else {
          res.json({"msg": "Could not find blog to delete"});
        }
      });
    } else {
      res.json({"msg": "Invalid params"});
    }
  }
}

module.exports = DashboardApi;
