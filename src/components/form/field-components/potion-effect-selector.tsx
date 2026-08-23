import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import type { FilterOptionsState } from "@mui/material/useAutocomplete";
import { matchSorter, rankings } from "match-sorter";
import type { FC, ReactNode } from "react";
import { useCallback, useMemo } from "react";
import { AppFormContext } from "#/lib/form/form-contexts";
import { PotionType } from "#/services/enums/potion-effect.enum";

export const PotionEffectSelector: FC<{
  label?: ReactNode;
}> = (props) => {
  const fieldContext = AppFormContext.useFieldContext<PotionType>();
  const options = useMemo(() => {
    return Object.values(PotionType);
  }, []);

  const handleFilterOptions = useCallback(
    (opts: Array<PotionType>, state: FilterOptionsState<PotionType>) => {
      const tokens = state.inputValue
        .split(" ")
        .map((token) => token.trim().normalize())
        .filter((token) => token.length > 0);
      if (tokens.length === 0) {
        return opts;
      }
      return tokens.reduceRight(
        (result, token) =>
          matchSorter(result, token, {
            threshold: rankings.CONTAINS,
          }),
        opts,
      );
    },
    [],
  );

  return (
    <Autocomplete
      disableClearable
      filterOptions={handleFilterOptions}
      options={options}
      value={fieldContext.state.value}
      onBlur={fieldContext.handleBlur}
      onChange={(_, v) => fieldContext.handleChange(v)}
      renderInput={(inputProps) => (
        <TextField {...inputProps} label={props.label} />
      )}
    />
  );
};
