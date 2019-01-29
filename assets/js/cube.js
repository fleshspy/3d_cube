window.onload = function () {
      var cube = document.getElementsByClassName("cube")[0];
      var cubeSidesCollection = document.querySelectorAll(".cube-wall");
      var detailsElemCollection = document.querySelectorAll(".details-ul .details-elem");
      var detailsElemCollectionSecond = document.querySelectorAll(".details-ul-second .details-elem");
      var cubeSideArray = ["front", "back", "left", "right", "top", "bottom"];
      var cubeZone = document.getElementsByClassName("cube-zone")[0];
      var cubeWallDetailsCollection = document.getElementsByClassName("cube-wall-details");

      var baseData = {
        miniCubeSettings : {
          width: "50px",
          height: "50px",
          top: "50px",
          right: "50px",
          fontSize: "10px"
          },
        originalCube : {
          width: "200px",
          height: "200px",
          top: "calc(50vh - 100px)",
          right: "calc(50vw - 100px)",
          fontSize: "2em"
        }
      }

      var findElemInArr = function (cubeSideArray) {
        return function (elemForCheck) {
          for (let i = 0; i < cubeSideArray.length; i++) {
            if (elemForCheck.indexOf(cubeSideArray[i]) != -1) {
              return cubeSideArray[i];
            }
          }
          return -1;
        }
      }
      var findSide = findElemInArr(cubeSideArray);

      function openCube(e) {
        var newClass;
        var cubeSide = findSide(e.target.classList.value);
        if (!cubeSide) return;

        newClass = cubeSide + "-push";
        e.target.classList.add(newClass);
        e.target.style.transition = "all 1s";
        setTimeout(function () { e.target.classList.remove(newClass); }, 1000);
      }
      function changeToMiniCube(isMini) {
        var newClass;
        if(arguments[0] == "mini") {
          for (let i = 0; i < cubeSidesCollection.length; i++) {
            newClass = findSide(cubeSidesCollection[i].classList.value);
            if (newClass == -1) { return; }
            newClass += "-mini";
            cubeSidesCollection[i].classList.add(newClass);
            cubeSidesCollection[i].classList.add("cube-wall-mini");
          }
        } else {
          for (let i = 0; i < cubeSidesCollection.length; i++) {
            newClass = findSide(cubeSidesCollection[i].classList.value);
            if (newClass == -1) { return; }
            newClass += "-mini";
            cubeSidesCollection[i].classList.remove(newClass);
            cubeSidesCollection[i].classList.remove("cube-wall-mini");
          }
        }
        

      }
      function setCubeSettings(cube, data) {
        cubeZone.style.width = data.width;
        cubeZone.style.height = data.height;
        cubeZone.style.top = data.top;
        cubeZone.style.right = data.right;
        cube.style.fontSize = data.fontSize;
        cubeZone.style.transition = "all 1s";
      }
      function pausedCube(cube) {
        if (cube.style.animationPlayState == "running" || cube.style.animationPlayState == "") {
          cube.style.animationPlayState = "paused";
        } else {
          cube.style.animationPlayState = "running";
        }
      }
      function hideCubeWallDetails(sign) {
        if(sign) {
          for (let i = 0; i < cubeWallDetailsCollection.length; i++) {
            cubeWallDetailsCollection[i].style.display = "none";
          }
        } else {
          for (let i = 0; i < cubeWallDetailsCollection.length; i++) {
            cubeWallDetailsCollection[i].style.display = "block";
          }
        }
      }
      function bindSideAndText(e, elemCollection, sign, r1, r2, r3) {
        if (e.target.classList.value.indexOf(sign) != -1) {
          for (let i = 0; i < elemCollection.length; i++) {
            elemCollection[i].style.backgroundColor = "rgba(" + r1 + ", " + r2 + ", " + r3 + ", 0.5)";
          }
        }
      }
      cube.addEventListener("mouseover", function (e) {
        // console.log(this);
        var rand1 = Math.floor(Math.random() * 255);
        var rand2 = Math.floor(Math.random() * 255);
        var rand3 = Math.floor(Math.random() * 255);
        e.target.style.backgroundColor = "rgba(" + rand1 + ", " + rand2 + ", " + rand3 + ", 0.5)";

        bindSideAndText(e, detailsElemCollection, "front", rand1, rand2, rand3);
        bindSideAndText(e, detailsElemCollectionSecond, "back", rand1, rand2, rand3);
        openCube(e);


      });
      cube.addEventListener("click", function () {
        pausedCube(this);
      });

      cube.addEventListener("dblclick", function () {
        var self = this;
        if(cubeZone.dataset.size == "original"){
          setCubeSettings(self, baseData.miniCubeSettings);
          changeToMiniCube("mini");
          hideCubeWallDetails(true);
          cubeZone.dataset.size = "mini"
        } else {
          setCubeSettings(self, baseData.originalCube);
          changeToMiniCube();
          hideCubeWallDetails(false);
          cubeZone.dataset.size = "original";
        }
        
      });

    };