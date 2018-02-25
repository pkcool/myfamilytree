package io.myfamilytree.service.dto;


import java.time.LocalDate;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import io.myfamilytree.domain.enumeration.Sex;

/**
 * A DTO for the Person entity.
 */
public class PersonDTO implements Serializable {

    private Long id;

    private String idNumber;

    private String surname;

    private String foreNames;

    private Sex sex;

    private String placeOfBirth;

    private LocalDate dateOfBirth;

    private String placeOfDeath;

    private LocalDate dateOfDeath;

    private String briefNote;

    private String notes;

    private Long fatherId;

    private Long motherId;

    private Long spouseId;

    private Set<StaticSourceDTO> sources = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getForeNames() {
        return foreNames;
    }

    public void setForeNames(String foreNames) {
        this.foreNames = foreNames;
    }

    public Sex getSex() {
        return sex;
    }

    public void setSex(Sex sex) {
        this.sex = sex;
    }

    public String getPlaceOfBirth() {
        return placeOfBirth;
    }

    public void setPlaceOfBirth(String placeOfBirth) {
        this.placeOfBirth = placeOfBirth;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getPlaceOfDeath() {
        return placeOfDeath;
    }

    public void setPlaceOfDeath(String placeOfDeath) {
        this.placeOfDeath = placeOfDeath;
    }

    public LocalDate getDateOfDeath() {
        return dateOfDeath;
    }

    public void setDateOfDeath(LocalDate dateOfDeath) {
        this.dateOfDeath = dateOfDeath;
    }

    public String getBriefNote() {
        return briefNote;
    }

    public void setBriefNote(String briefNote) {
        this.briefNote = briefNote;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Long getFatherId() {
        return fatherId;
    }

    public void setFatherId(Long personId) {
        this.fatherId = personId;
    }

    public Long getMotherId() {
        return motherId;
    }

    public void setMotherId(Long personId) {
        this.motherId = personId;
    }

    public Long getSpouseId() {
        return spouseId;
    }

    public void setSpouseId(Long personId) {
        this.spouseId = personId;
    }

    public Set<StaticSourceDTO> getSources() {
        return sources;
    }

    public void setSources(Set<StaticSourceDTO> staticSources) {
        this.sources = staticSources;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PersonDTO personDTO = (PersonDTO) o;
        if(personDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), personDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PersonDTO{" +
            "id=" + getId() +
            ", idNumber='" + getIdNumber() + "'" +
            ", surname='" + getSurname() + "'" +
            ", foreNames='" + getForeNames() + "'" +
            ", sex='" + getSex() + "'" +
            ", placeOfBirth='" + getPlaceOfBirth() + "'" +
            ", dateOfBirth='" + getDateOfBirth() + "'" +
            ", placeOfDeath='" + getPlaceOfDeath() + "'" +
            ", dateOfDeath='" + getDateOfDeath() + "'" +
            ", briefNote='" + getBriefNote() + "'" +
            ", notes='" + getNotes() + "'" +
            "}";
    }
}
