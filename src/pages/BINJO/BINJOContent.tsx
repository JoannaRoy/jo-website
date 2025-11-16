import Papa from "papaparse";
import rawCsv from "../../blog_data/2025_binjo_progress.csv?raw";

interface ProgressRow {
  Item: string;
  Planned: string;
  Completed: string;
  Notes: string;
}

const parseCsv = (csvString: string) => {
  const result = Papa.parse<ProgressRow>(csvString, { header: true });
  return result.data.map((row: ProgressRow) => ({
    item: row.Item,
    planned: parseFloat(row.Planned) || 0,
    completed: parseFloat(row.Completed) || 0,
    remaining:
      100 - (parseFloat(row.Planned) || 0) - (parseFloat(row.Completed) || 0),
    notes: row.Notes,
  }));
};

export const progressData = parseCsv(rawCsv);
