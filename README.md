# forceRight

A personal “problem-tracking & reflection” tool for programmers 🎯  
Use this project to **record programming problems**, **track what you did**, **analyze where you lacked**, and **write a mini-blog post** about each problem to improve your craft.

---

## 🚀 Why

We all solve bugs, puzzles or tasks — but often **don’t reflect** on them:
- What was the problem really?  
- Why did I struggle?  
- What assumptions or gaps let it slip?  
- How did I fix it (or how will I fix it next time)?  

forceRight helps you build a **log of problems + reflections**, so you can look back, revisit your reasoning and gradually _refine your debugging / solving muscle_.

---

## 🧱 Key Features

- Create a “problem entry” with:
  - problem description / context  
  - what you tried  
  - what worked / didn’t work  
  - lessons learned & next steps  
- Tag problems (e.g., “React hooks”, “Database schema”, “Deploy”, “Algorithm”).  
- Write a short blog-style note for each problem — your “post-mortem”.  
- Keep it all in code / markdown, versioned in your repo (so your learning becomes part of your codebase).  
- Use across your projects (frontend, backend, devops) — whatever you’re doing.

---

## ✨ Demo

| Dashboard  | Track Add and Delete | Analytics | Libraray|
|----------------|------------|
|![Dashboard](/AppDemo/dashboard.gif) | ![Track Entry](/AppDemo/addAndDeleteTrack.gif) | ![Analytics](/AppDemo/Analytics.gif) | ![Library](/AppDemo/Library.gif.gif)

## 📁 How It’s Structured

Inside this repo you’ll find something like:
<pre>
├─ frontend/
├─ forceRight_1/
│  ├─ prisma/
│  └─ …
├─ tasks.txt
├─ .gitignore
└─ README.md
</pre>
---

## 🛠 How to Use

1. Clone this repo (or fork it for your personal use).  
2. Add a new “problem entry” whenever you hit a meaningful challenge:  
   - Create a new markdown file (e.g., `problems/YYYY-MM-DD-problem-slug.md`)  
   - Fill in: title, date, description, what you attempted, what you learned.  
3. Update `tasks.txt` (or any “problem backlog” list) if you have boilerplate tasks or things you want to revisit.  
4. Use tags/categories so you can filter by topic later.  
5. Commit & push — your reflection becomes versioned!  
6. After some time (weeks/months) revisit your entries: what patterns do you see? which topics keep coming up?  
7. Optionally build a small UI or dashboard (in `frontend/`) to browse your past entries by tag/date.

---

## 🎯 Why this matters

- It turns **ad hoc problem solving** into **learning artifacts**.  
- Helps you track **weak spots** across your skill-set (syntax, logic, design, testing).  
- Encourages you to **reflect** and thus _learn more deeply_ — not just move on.  
- Builds your personal “problem history” — useful for every dev, especially when you interview or need to recall how you overcame something similar.

---

## 📌 Best Practices

- Be honest — record what you *didn’t know* as well as what you got right.  
- Use consistent naming / dates so you can sort easily.  
- Tag generously — later you’ll want to filter entries by theme.  
- Revisit entries quarterly — check your progress.  
- Keep it simple: one entry per problem is enough; no need for perfect prose.

---

## 🤝 Contributing

This is primarily a **personal workflow tool**, but if you’d like to improve it (e.g. add UI, better tagging, export/import, analytics) … you’re welcome!  
- Submit pull requests.  
- Suggest features via issues.  
- Keep the scope manageable: this isn’t a full-scale issue tracker, it’s a personal reflection system.

---

## 🧾 License

This project is open source, feel free to use it for your own learning and adapt it for your workflow.  
(Consider adding a LICENSE file e.g. MIT if you want explicit terms.)

---

## 🔭 Final Thoughts

The journey of development isn’t only about **what you build**, but also **how you learn while building**.  
With forceRight you turn your challenges into **reflections**, your mistakes into **lessons**, and your everyday tasks into a path of continual improvement.

Happy coding & reflecting!  
— You

