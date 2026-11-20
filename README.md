# Prof. Dasaka S. Murty — Personal Academic Website

Static website (plain HTML/CSS/JS, no build step) for Prof. Satyanarayana Murty Dasaka,
Department of Civil Engineering, IIT Bombay. Content is based on his CV dated 13 January 2026.

## Pages
| File | Content |
|---|---|
| `index.html` | Home: photo, about, highlights |
| `profile.html` | Education, experience, awards, memberships |
| `research.html` | Research areas, sponsored projects, patents, lab |
| `publications.html` | Edited volumes, journals, book chapters, conferences (searchable) |
| `students.html` | Post-docs, Ph.D., M.Tech., M.S. students |
| `teaching.html` | Courses, courses developed, QIP/CEP |
| `outreach.html` | Lectures, events organised, service |
| `contact.html` | Contact details and map |

Shared files: `assets/style.css` (design), `assets/site.js` (menu, footer, publication search).

## Updating
- **Add a publication:** copy an existing `<li>…</li>` line in `publications.html` and edit it.
- **Change the menu or "Last updated" date:** edit the top of `assets/site.js`.

## Hosting
Copy the whole folder into the IITB home-directory web folder (`public_html`) so it is served at
`https://www.civil.iitb.ac.in/~dasaka/`. It can also be served with GitHub Pages.
