document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "2f361c20b7a643cd830ca50029770932";
  const recipeId = getRecipeIdFromURL();

  function getRecipeIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
  }

  function handleRecipeIdError() {
    console.error("Error: Recipe ID not found in URL.");
  }

  function fetchRecipeDetails(recipeId) {
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        document.querySelector(".recipe-title").textContent = data.title;
        document.querySelector("#cooking-time").textContent = `${data.readyInMinutes} minutes`;
        document.querySelector("#servings").textContent = data.servings;

        const ingredientList = document.querySelector("#ingredient-list");
        ingredientList.innerHTML = '';
        data.extendedIngredients.forEach((ingredient) => {
          const li = document.createElement("li");
          li.textContent = ingredient.original;
          ingredientList.appendChild(li);
        });

        const instructionList = document.querySelector("#instruction-list");
        instructionList.innerHTML = '';
        data.analyzedInstructions[0].steps.forEach((step) => {
          const li = document.createElement("li");
          li.textContent = step.step;
          instructionList.appendChild(li);
        });


      })
      .catch((error) => {
        console.error("Error fetching recipe:", error);
      });
  }

  if (!recipeId) {
    handleRecipeIdError();
  } else {
    fetchRecipeDetails(recipeId);
  }
});
