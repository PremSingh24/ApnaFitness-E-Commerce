import {
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Typography,
  Button,
  Checkbox,
  InputAdornment,
  TextField,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import { useState } from "react";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import CloseIcon from "@mui/icons-material/Close";
import useFilterStore from "../store/filter.store";

function valuetext(value: number) {
  return `Rs${value}`;
}

const FilterOptions = ({
  filterOptionsOpen,
  setFilterOptions,
}: {
  filterOptionsOpen: boolean;
  setFilterOptions: any;
}) => {
  const initialPriceRange = useFilterStore((state) => state.priceRange);
  const initialRating = useFilterStore((state) => state.rating);
  const initialFastDeliveryOnly = useFilterStore(
    (state) => state.fastDeliveryOnly
  );
  const initialRemoveOutOfStock = useFilterStore(
    (state) => state.removeOutOfStock
  );

  const [priceRange, setPriceRange] = useState<number[]>(initialPriceRange);
  const [rating, setRating] = useState(initialRating);

  const [fastDeliveryOnly, setFastDeliveryOnly] = useState<boolean>(
    initialFastDeliveryOnly
  );

  const [removeOutOfStock, setRemoveOutOfStock] = useState(
    initialRemoveOutOfStock
  );

  const setAllFilters = useFilterStore((state) => state.setAllFilters);

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handlePriceFromInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.target.value === ""
      ? setPriceRange((previous) => {
          return [0, previous[1]];
        })
      : setPriceRange((previous) => {
          return [Number(event.target.value), previous[1]];
        });
  };

  const handlePriceToInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.target.value === ""
      ? setPriceRange((previous) => {
          return [previous[0], 10000];
        })
      : setPriceRange((previous) => {
          return [previous[0], Number(event.target.value)];
        });
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value));
  };

  const handleFastDeliveryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFastDeliveryOnly(event.target.checked);
  };

  const handleOutOfStockChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRemoveOutOfStock(event.target.checked);
  };

  const applyFilters = () => {
    setAllFilters({
      priceRange: priceRange,
      rating: rating,
      removeOutOfStock: removeOutOfStock,
      fastDeliveryOnly: fastDeliveryOnly,
    });
  };

  const resetFilters = () => {
    setPriceRange([0, 10000]);
    setRating(1);
    setFastDeliveryOnly(false);
    setRemoveOutOfStock(false);
    setAllFilters({
      priceRange: [0, 10000],
      rating: 1,
      removeOutOfStock: false,
      fastDeliveryOnly: false,
    });
  };

  return (
    <>
      <Drawer
        anchor="bottom"
        open={filterOptionsOpen}
        onClose={() => setFilterOptions(false)}
      >
        <Paper sx={{ height: "75vh", overflow: "auto" }}>
          <List
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "10px",
              paddingRight: "5px",
            }}
          >
            <Typography variant="h5">Filters</Typography>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="text"
                sx={{ fontSize: "1rem" }}
                onClick={() => {
                  resetFilters();
                }}
              >
                Clear All
              </Button>

              <IconButton
                name="close-sort-options"
                onClick={() => {
                  setFilterOptions(false);
                  setPriceRange(initialPriceRange);
                  setRating(initialRating);
                  setFastDeliveryOnly(initialFastDeliveryOnly);
                  setRemoveOutOfStock(initialRemoveOutOfStock);
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </List>
          <Divider />

          <Typography
            variant="h6"
            fontWeight={600}
            paddingTop={"1rem"}
            sx={{ paddingLeft: "15px" }}
          >
            Price
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <List
              sx={{
                display: "flex",
                justifyContent: "space-around",
                width: "80%",
              }}
            >
              <Typography variant="subtitle1">0</Typography>
              <Typography variant="subtitle1">2K</Typography>
              <Typography variant="subtitle1">4K</Typography>
              <Typography variant="subtitle1">6K</Typography>
              <Typography variant="subtitle1">8K</Typography>
              <Typography variant="subtitle1">10K</Typography>
            </List>

            <Box sx={{ width: "70vw" }}>
              <Slider
                getAriaLabel={() => "Price range"}
                size="medium"
                min={0}
                max={10000}
                value={priceRange}
                onChange={handleSliderChange}
                getAriaValueText={valuetext}
              />
            </Box>
          </div>

          <List sx={{ display: "flex", justifyContent: "space-around" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1">From</Typography>
              <TextField
                value={priceRange[0]}
                size="small"
                onChange={handlePriceFromInputChange}
                inputProps={{
                  step: 100,
                  min: 0,
                  max: priceRange[1],
                  type: "number",
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1">To</Typography>
              <TextField
                value={priceRange[1]}
                size="small"
                onChange={handlePriceToInputChange}
                inputProps={{
                  step: 100,
                  min: priceRange[0],
                  max: 10000,
                  type: "number",
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
              />
            </div>
          </List>

          <Divider />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "15px",
            }}
          >
            <Typography variant="h6" fontWeight={600} paddingTop={"1rem"}>
              Ratings
            </Typography>
            <FormControl sx={{ paddingLeft: "20px", width: "max-content" }}>
              <RadioGroup
                name="controlled-radio-buttons-group"
                value={rating}
                onChange={handleRatingChange}
              >
                <FormControlLabel
                  value={4}
                  name="4star"
                  control={<Radio />}
                  label="4 Star and Above"
                />
                <FormControlLabel
                  value={3}
                  name="3star"
                  control={<Radio />}
                  label="3 Star and Above"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <Divider />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "15px",
            }}
          >
            <Typography variant="h6" fontWeight={600} paddingTop={"1rem"}>
              Other Filters
            </Typography>
            <FormControl sx={{ paddingLeft: "20px", width: "max-content" }}>
              <FormControlLabel
                value={true}
                name="Fast Delivery"
                control={
                  <Checkbox
                    onChange={handleFastDeliveryChange}
                    checked={fastDeliveryOnly}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Fast Delivery Only"
              />

              <FormControlLabel
                value={true}
                name="Out Of Stock"
                control={
                  <Checkbox
                    onChange={handleOutOfStockChange}
                    checked={removeOutOfStock}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Remove Out of Stock"
              />
            </FormControl>
          </div>
        </Paper>

        <Button
          variant="contained"
          size="large"
          sx={{ paddingBottom: "15px", fontSize: "1rem" }}
          onClick={() => {
            applyFilters();
          }}
        >
          Apply Filters
        </Button>
      </Drawer>
    </>
  );
};

const SortOptions = ({
  sortOptionsOpen,
  setSortOptions,
}: {
  sortOptionsOpen: boolean;
  setSortOptions: any;
}) => {
  const sortBy = useFilterStore((state) => state.sortBy);
  const setSortBy = useFilterStore((state) => state.setSortBy);

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortBy(event.target.value);
  };

  return (
    <Drawer
      anchor="bottom"
      open={sortOptionsOpen}
      onClose={() => setSortOptions(false)}
    >
      <Paper sx={{ height: "30vh" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "10px",
            paddingRight: "5px",
          }}
        >
          <Typography variant="h6" fontWeight={600} paddingTop={"1rem"}>
            Sort By
          </Typography>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="text"
              sx={{ fontSize: "1rem" }}
              onClick={() => {
                setSortBy("");
                setSortOptions(false);
              }}
            >
              Clear
            </Button>

            <IconButton
              name="close-sort-options"
              onClick={() => {
                setSortOptions(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>

        <FormControl sx={{ paddingLeft: "20px", width: "max-content" }}>
          <RadioGroup
            name="controlled-radio-buttons-group"
            value={sortBy}
            onChange={handleSortChange}
          >
            <FormControlLabel
              value="low"
              name="Low"
              control={<Radio />}
              label="Price: Low to High"
            />
            <FormControlLabel
              value="high"
              name="High"
              control={<Radio />}
              label="Price: High to Low"
            />
          </RadioGroup>
        </FormControl>
      </Paper>
    </Drawer>
  );
};

const MobileFilters = () => {
  const [sortOptionsOpen, setSortOptions] = useState(false);
  const [filterOptionsOpen, setFilterOptions] = useState(false);

  return (
    <>
      <Paper sx={{ width: "49%", display: "flex", justifyContent: "center" }}>
        <IconButton
          size="large"
          aria-label="show sort"
          color="inherit"
          sx={{ alignContent: "center", padding: "15px", width: "100%" }}
          onClick={() => setSortOptions(true)}
        >
          <SortIcon sx={{ fontSize: "1.5rem" }} />
          <Typography fontSize={"1.2rem"}>Sort</Typography>
        </IconButton>
        <Divider />
      </Paper>
      <Paper sx={{ width: "50%", display: "flex", justifyContent: "center" }}>
        <IconButton
          size="large"
          aria-label="show filters"
          color="inherit"
          sx={{ alignContent: "center", padding: "15px", width: "100%" }}
          onClick={() => {
            setFilterOptions(true);
          }}
        >
          <FilterAltIcon sx={{ fontSize: "1.5rem" }} />
          <Typography fontSize={"1.2rem"}>Filter</Typography>
        </IconButton>
      </Paper>
      <SortOptions
        sortOptionsOpen={sortOptionsOpen}
        setSortOptions={setSortOptions}
      />
      <FilterOptions
        filterOptionsOpen={filterOptionsOpen}
        setFilterOptions={setFilterOptions}
      />
    </>
  );
};

export default MobileFilters;
