interface PlantInfo {
  id: number | null;
  image: string | null;
  nickname: string | null;
  plantName: string;
  scientificName: string | null;
  adoptionDate: string;
  deathDate: string | null;
  memo: string | null;
  advice: string | null;
  openAllow: number;
  familyName: STRING | null;
}

export { PlantInfo };
