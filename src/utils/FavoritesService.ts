import { Dentist } from "../types/api-types";

/**
 * Represents a service for managing favorite dentists.
 */
class FavoritesService { 
  private favoriteDentists: Dentist[] = []; 
  private favoritesChangedCallback: (favoriteDentists: Dentist[]) => void;
  

  constructor(favoritesChangedCallback?: (favoriteDentists: Dentist[]) => void) {
    this.favoriteDentists = JSON.parse(localStorage.getItem("favoriteDentistsDeividWebApp") ?? "[]");
    this.favoritesChangedCallback = favoritesChangedCallback ?? (() => {});
  }
  /**
   * Retrieves the list of favorite dentists.
   *
   * @return {Dentist[]} The list of favorite dentists.
   */
  getFavoriteDentists(): Dentist[] {
    return this.favoriteDentists;
  }

  /**
   * Adds a favorite dentist to the list of favorite dentists.
   *
   * @param {Dentist} dentist - The dentist to be added as a favorite.
   * @return {void} This function does not return anything.
   */
  addFavoriteDentist(dentist: Dentist): void {
    this.favoriteDentists.push(dentist);
    this.saveFavorites();
    this.notifyFavoritesChanged();
  }

  /**
   * Removes a favorite dentist from the list of favorite dentists.
   *
   * @param {Dentist} dentist - The dentist to be removed from the list of favorite dentists.
   * @return {void} This function does not return anything.
   */
  removeFavoriteDentist(dentist: Dentist): void {
    this.favoriteDentists = this.favoriteDentists.filter(item => item.id !== dentist.id);
    this.saveFavorites();
    this.notifyFavoritesChanged();
  }

/**
 * Adds or removes a dentist from the favorites list.
 *
 * @param {Dentist} dentist - The dentist to add or remove.
 * @return {void} This function does not return a value.
 */
  addOrRemoveFavoriteDentist(dentist: Dentist): void {
    if (this.isFavorite(dentist)) {
      this.removeFavoriteDentist(dentist);

    } else {
      this.addFavoriteDentist(dentist);
    }
  }

  
  /**
   * Checks if the given dentist is in the list of favorite dentists.
   *
   * @param {Dentist} dentist - The dentist to check.
   * @return {boolean} - Returns true if the dentist is in the list of favorite dentists, otherwise returns false.
   */
  isFavorite(dentist: Dentist): boolean {
    return this.favoriteDentists.some(item => item.id === dentist.id);
  }
  /**
   * Saves the favorite dentists to the local storage.
   *
   * @param {void} - This function does not accept any parameters.
   * @return {void} - This function does not return any value.
   */
  private saveFavorites(): void {
    localStorage.setItem("favoriteDentistsDeividWebApp", JSON.stringify(this.favoriteDentists));
  }

  /**
   * Notifies when favorites have changed.
   *
   * @return {void} nothing is returned
   */
  private notifyFavoritesChanged(): void {
    this.favoritesChangedCallback(this.favoriteDentists);
  }

  public getFavoritesChangedCallback(): (favoriteDentists: Dentist[]) => void {
    return this.favoritesChangedCallback;
  }
  public setFavoritesChangedCallback(favoritesChangedCallback: (favoriteDentists: Dentist[]) => void) {
    this.favoritesChangedCallback = favoritesChangedCallback;
  }
}

export default FavoritesService;