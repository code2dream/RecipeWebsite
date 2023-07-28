document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "2f361c20b7a643cd830ca50029770932";
    const recipeList = document.getElementById("recipe-list");
    if (!recipeList){
        console.error("Error: 'recipe-list' element not found!");
        return;
    }

    fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const recipes = data.recipes;

            recipes.forEach(recipe => {
                const li = document.createElement("li");
                li.innerHTML = `
                <h2 class="recipe-title">${recipe.title}</h2>
                <img class="recipe-image" src="${recipe.image}" alt="${recipe.title}">
                <p class = "recipe-summary">${recipe.summary}</p>
                <a class="recipes-link btn btn-dark" href="./recipe.html?id=${recipe.id}" target="_blank">View Recipe</a>`;
                recipeList.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Error fetching recipes:", error)
        });
});
