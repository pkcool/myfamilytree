package io.myfamilytree.service.dto;


import java.time.LocalDate;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Marriage entity.
 */
public class MarriageDTO implements Serializable {

    private Long id;

    private LocalDate dateOfMarriage;

    private LocalDate endOfMarriage;

    private String notes;

    private Long maleId;

    private Long femaleId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateOfMarriage() {
        return dateOfMarriage;
    }

    public void setDateOfMarriage(LocalDate dateOfMarriage) {
        this.dateOfMarriage = dateOfMarriage;
    }

    public LocalDate getEndOfMarriage() {
        return endOfMarriage;
    }

    public void setEndOfMarriage(LocalDate endOfMarriage) {
        this.endOfMarriage = endOfMarriage;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Long getMaleId() {
        return maleId;
    }

    public void setMaleId(Long personId) {
        this.maleId = personId;
    }

    public Long getFemaleId() {
        return femaleId;
    }

    public void setFemaleId(Long personId) {
        this.femaleId = personId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MarriageDTO marriageDTO = (MarriageDTO) o;
        if(marriageDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), marriageDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MarriageDTO{" +
            "id=" + getId() +
            ", dateOfMarriage='" + getDateOfMarriage() + "'" +
            ", endOfMarriage='" + getEndOfMarriage() + "'" +
            ", notes='" + getNotes() + "'" +
            "}";
    }
}
