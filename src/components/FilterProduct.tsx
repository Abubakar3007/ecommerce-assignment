import React from "react";

// props type
type Props = {
    categories: string[];
    selectedCategories: string[];
    sortBy: string;
    onCategoryFilterChange: (filters: { selectedCategories: string[]; sortBy: string; }) => void;
};

const FilterProduct = ({ categories, selectedCategories, sortBy, onCategoryFilterChange, }: Props) => {
    // togge category
    const toggleCategory = (category: string) => {
        let updatedSelectArray: string[]; // updated selected categories array

        if (category === "All") { // check select category is all
            updatedSelectArray = ["All"]; // if all then update array with all item name
        } else {
            // remove all other categories
            const withoutAllCategory = selectedCategories.filter(c => c !== "All"); 
            // remove if already selected
            if (withoutAllCategory.includes(category)) {
                updatedSelectArray = withoutAllCategory.filter(c => c !== category);
            } else {
                // add new category
                updatedSelectArray = [...withoutAllCategory, category];
            }

            // check if category length is 0, then add "All"
            if (updatedSelectArray.length === 0) {
                updatedSelectArray = ["All"];
            }
        }

        onCategoryFilterChange({ selectedCategories: updatedSelectArray, sortBy });
    };

    // handle sort select
    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onCategoryFilterChange({
            selectedCategories,
            sortBy: e.target.value,
        });
    };

    // filter bar style
    const filterBarStyle: React.CSSProperties = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: "12px",
        alignItems: "center",
        marginBottom: "40px",
        padding: "12px 20px",
        background: "#f8f9fa",
        borderRadius: "12px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    };

    const filterLeftSide: React.CSSProperties = {
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "8px",
    };

    const filterLabelStyle: React.CSSProperties = {
        fontWeight: "600",
        fontSize: "16px",
        color: "#1a1a2e",
        marginRight: "4px",
    };

    const chipStyle = (isActive: boolean): React.CSSProperties => ({
        padding: "6px 14px",
        borderRadius: "20px",
        border: "2px solid #ddd",
        background: isActive ? "#982b3dff" : "#fff",
        color: isActive ? "#fff" : "#333",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: 500,
        transition: "0.2s",
        textTransform: "capitalize",
    });

    const sortSelectStyle: React.CSSProperties = {
        padding: "8px 12px",
        borderRadius: "8px",
        border: "2px solid #ddd",
        background: "#fff",
        fontSize: "14px",
        cursor: "pointer",
        marginLeft: "auto",
    };

    return (
        <div style={filterBarStyle}>
            <div style={filterLeftSide}>
                <span style={filterLabelStyle}>Filter:</span>

                {categories.map((category) => {
                    const isActive = category === "All" ? selectedCategories.length === 0 : selectedCategories.includes(category); // check which category button active
                    return (
                        <button
                            key={category}
                            onClick={() => toggleCategory(category)}
                            style={chipStyle(isActive)}
                        >
                            {category}
                        </button>
                    );
                })}
            </div>

            <select value={sortBy} onChange={handleSort} style={sortSelectStyle}>
                <option value="">Sort by...</option>
                <option value="price-asc">Price ↑</option>
                <option value="price-desc">Price ↓</option>
                <option value="title-asc">A → Z</option>
                <option value="title-desc">Z → A</option>
            </select>
        </div>
    );
};

export default FilterProduct;
