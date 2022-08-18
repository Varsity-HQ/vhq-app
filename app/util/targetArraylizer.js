const targetArraylizer = (targetObj) => {
  let targets = [];

  Object.keys(targetObj).forEach(function (key) {
    if (key === "first" && targetObj[key] === true) {
      targets.push("1st");
    }
    if (key === "second" && targetObj[key] === true) {
      targets.push("2nd");
    }
    if (key === "third" && targetObj[key] === true) {
      targets.push("3rd");
    }
    if (key === "forth" && targetObj[key] === true) {
      targets.push("4th");
    }
    if (key === "postgraduates" && targetObj[key] === true) {
      targets.push("postgraduates");
      targets.push("masters");
      targets.push("honors");
      targets.push("phd");
    }
  });
  return targets;
};

const targetObjectizer = (targetArray) => {
  let targets = {
    first: false,
    second: false,
    third: false,
    forth: false,
    postgraduates: false,
  };

  if (Array.isArray(targetArray)) {
    targetArray.forEach((x) => {
      if (x === "1st") {
        targets = {
          ...targets,
          first: true,
        };
      }
      if (x === "2nd") {
        targets = {
          ...targets,
          second: true,
        };
      }
      if (x === "3rd") {
        targets = {
          ...targets,
          third: true,
        };
      }
      if (x === "4th") {
        targets = {
          ...targets,
          forth: true,
        };
      }
      if (x === "postgraduates") {
        targets = {
          ...targets,
          postgraduates: true,
        };
      }
    });

    return targets;
  } else {
    return targets;
  }
};

export { targetArraylizer, targetObjectizer };
