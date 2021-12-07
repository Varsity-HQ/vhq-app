import uniCollList from "../util/UnisAndColleges.json";

export default function universityShortName(university) {
  let short_name;
  uniCollList.forEach((x) => {
    if (x.name === university) {
      short_name = x.short_name;
    }
  });

  return short_name;
}
