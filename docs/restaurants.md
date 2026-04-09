# Restaurant Picker

A randomized restaurant picker app. The list below is the single source of truth for which restaurants appear in the app.

When this file is updated on `main`, a GitHub Actions workflow will automatically open a PR to sync the changes into `src/restaurants.js`.

---

## Restaurant List

| Name | Cuisine | Address | Description |
|------|---------|---------|-------------|
| Joe's Pizza | Italian | 7 Carmine St, New York, NY | Classic NYC slice joint, cash only, always a line for a reason. |
| Xi'an Famous Foods | Chinese | 81 St Marks Pl, New York, NY | Hand-ripped noodles and spicy lamb face salad from Xi'an province. |
| Superiority Burger | Vegetarian | 119 Avenue A, New York, NY | Cult-favorite veggie burgers that even meat-eaters crave. |
| Hometown Bar-B-Que | BBQ | 454 Van Brunt St, Brooklyn, NY | Texas-style brisket smoked low and slow in Red Hook. |
| Dirt Candy | Vegetarian | 86 Allen St, New York, NY | Fine-dining vegetable-forward restaurant that changed how people think about meatless cooking. |
| Prince Street Pizza | Italian | 27 Prince St, New York, NY | Famous for their pepperoni cups and crispy Sicilian squares. |
| Taqueria al Pastor | Mexican | 204 Allen St, New York, NY | No-frills tacos al pastor with pineapple, made fresh on a trompo. |
| Lucali | Italian | 575 Henry St, Brooklyn, NY | BYOB pizza institution in Carroll Gardens with a long wait and worth every minute. |

---

## How to add a restaurant

Edit the table above and commit to `main`. A bot will open a PR to update the app code within a minute or two.

## How to remove a restaurant

Delete its row from the table and commit to `main`. Same automated PR flow applies.

---

## Architecture

- **App**: React + Vite, hosted on Vercel
- **Docs**: This site, hosted on GitHub Pages (Docsify)
- **Sync**: GitHub Actions + Claude API
  - `docs/restaurants.md` changed → bot opens PR to update `src/restaurants.js`
  - `src/restaurants.js` changed → bot opens PR to update `docs/restaurants.md`
