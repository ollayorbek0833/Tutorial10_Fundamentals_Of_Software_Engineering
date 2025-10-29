# Tutorial 10 — Fundamentals of Software Engineering  
  
Ollayorbek Masharipov - 230036

### Overview
I reviewed the TypeScript Tic-Tac-Toe codebase with ESLint 9 and manual inspection, identified **5+ code smells**, refactored them, and ensured the project passes lint checks. Each item below lists the **file & lines**, **smell**, **refactoring technique**, and **benefit**.

---

## 1) Undeclared global in Jest config
-  `jest.config.js:1`
- `no-undef` — Node global `module` not declared.
- Added ESLint environment header for Node.
- **Change:**
  ```js
  /* eslint-env node */
  module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
  };
  ```
- Removes the global leak warning; clarifies runtime for linting.

---

## 2) `var` declarations in tests (legacy scoping)
- `src/Game.test.ts` ~ lines **38, 51, 63, 76, 88, 101** (from ESLint report)
- `no-var` — function scope and hoisting; higher risk of accidental reassignments.
- Replaced `var` with `const` (or `let` when reassignment is required).
- Block-scoped bindings, safer state, modern JS best practice.

---

## 3) Long test function (low cohesion)
- `src/Game.test.ts:4` — the single arrow function contained ~102 lines.
- `max-lines-per-function` warning; low cohesion and readability.
- Split the large test into multiple focused `it(...)` cases, introduced a tiny helper (`beforeEach` with a shared `game` instance).  
- Each test is short and intention-revealing; easier to debug and maintain; satisfies ESLint’s function-length rule.

---

## 4) High cyclomatic complexity in winner calculation
- `src/Game.ts` method `Winner` around **line 27** (ESLint reported complexity **16**)
- Complex conditionals and repeated logic to detect winning states.
- `lineWinner(board, line)` returning the winner for a given triple, centralized `WIN_LINES` array for rows, columns, diagonals, early return on first detected winner.
- code
  ```ts
  const WIN_LINES = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6],
  ];

  function lineWinner(board: (string|null)[], [a,b,c]: number[]): string|null {
    if (!board[a]) return null;
    return board[a] === board[b] && board[b] === board[c] ? board[a] as string : null;
  }

  // inside Game
  winner(): string|null {
    for (const line of WIN_LINES) {
      const w = lineWinner(this.board, line);
      if (w) return w;
    }
    return null;
  }
  ```
- Readable and testable; complexity drops well below 10; no duplicated checks.
    

5\. Unused Variable
-------------------

*   src/Game.ts:99 — variable tile assigned but never used.
    
*   @typescript-eslint/no-unused-vars.
    
*   Removed the unused variable or prefixed it with \_ if part of the interface.
    
*   Removes dead code, reduces noise, and clarifies intent.
