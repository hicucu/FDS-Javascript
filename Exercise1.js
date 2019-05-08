function Q1() {
  var x = 15;
  if (x > 10 && x < 20) console.log(x);
}

function Q2() {
  for (let i = 0; i < 10; i++) if (!(i % 2)) console.log(i);
}

function Q3() {
  let result = '';
  for (let i = 0; i < 10; i++) if (!(i % 2)) result += i;

  console.log(result);
}

function Q4() {
  for (let i = 9; i >= 0; i--) if (i % 2) console.log(i);
}

function Q5() {
  let cnt = 0;
  while (cnt < 10) {
    if (!(cnt % 2)) console.log(cnt);
    cnt += 1;
  }
}

function Q6() {
  let cnt = 9;
  while (cnt > -1) {
    if (cnt % 2) console.log(cnt);
    cnt -= 1;
  }
}

function Q7() {
  let result = 0;
  for (let i = 0; i < 10; i++) result += i;
  console.log(result);
}

function Q8() {
  let result = 0;
  for (let i = 0; i < 20; i++) if (i % 2 && i % 3) result += i;

  console.log(result);
}

function Q9() {
  let result = 0;
  for (let i = 0; i < 20; i++) {
    if (i % 2 && i % 3) continue;
    result += i;
  }

  console.log(result);
}

function Q10() {
  for (let i = 1; i < 7; i++) {
    for (let j = 1; j < 7; j++) {
      if (i + j === 6) console.log(`[${i}, ${j}]`);
    }
  }
}

function Q11() {
  const height = 5;
  let result = '';
  for (let i = 0; i < height; i++) {
    for (let j = 0; j <= i; j++) result += '*';
    result += '\n';
  }
  console.log(result);
}

function Q12() {
  const height = 5;
  let result = '';
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < i; j++) result += ' ';
    for (let j = 0; j < height - i; j++) result += '*';
    result += '\n';
  }
  console.log(result);
}

function Q13() {
  const height = 5;
  let result = '';
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < height - i; j++) result += '*';
    result += '\n';
  }
  console.log(result);
}

function Q14() {
  const height = 5;
  let result = '';
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < height - i - 1; j++) result += ' ';
    for (let j = 0; j <= i; j++) result += '*';
    result += '\n';
  }
  console.log(result);
}

function Q15() {
  const height = 5;
  let result = '';
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < height - i - 1; j++) result += ' ';
    for (let j = 0; j < i * 2 + 1; j++) result += '*';
    result += '\n';
  }
  console.log(result);
}

function Q16() {
  const height = 5;
  let result = '';
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < i; j++) result += ' ';
    for (let j = 0; j < height * 2 - i * 2 - 1; j++) result += '*';
    result += '\n';
  }
  console.log(result);
}

console.log('---------Q1---------');
Q1();
console.log('---------Q2---------');
Q2();
console.log('---------Q3---------');
Q3();
console.log('---------Q4---------');
Q4();
console.log('---------Q5---------');
Q5();
console.log('---------Q6---------');
Q6();
console.log('---------Q7---------');
Q7();
console.log('---------Q8---------');
Q8();
console.log('---------Q9---------');
Q9();
console.log('---------Q10---------');
Q10();
console.log('---------Q11---------');
Q11();
console.log('---------Q12---------');
Q12();
console.log('---------Q13---------');
Q13();
console.log('---------Q14---------');
Q14();
console.log('---------Q15---------');
Q15();
console.log('---------Q16---------');
Q16();
