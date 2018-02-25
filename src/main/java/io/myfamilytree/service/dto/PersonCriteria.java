package io.myfamilytree.service.dto;

import java.io.Serializable;
import io.myfamilytree.domain.enumeration.Sex;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;


import io.github.jhipster.service.filter.LocalDateFilter;



/**
 * Criteria class for the Person entity. This class is used in PersonResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /people?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class PersonCriteria implements Serializable {
    /**
     * Class for filtering Sex
     */
    public static class SexFilter extends Filter<Sex> {
    }

    private static final long serialVersionUID = 1L;


    private LongFilter id;

    private StringFilter idNumber;

    private StringFilter surname;

    private StringFilter foreNames;

    private SexFilter sex;

    private StringFilter placeOfBirth;

    private LocalDateFilter dateOfBirth;

    private StringFilter placeOfDeath;

    private LocalDateFilter dateOfDeath;

    private StringFilter briefNote;

    private StringFilter notes;

    private LongFilter fatherId;

    private LongFilter motherId;

    private LongFilter spouseId;

    private LongFilter sourceId;

    public PersonCriteria() {
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(StringFilter idNumber) {
        this.idNumber = idNumber;
    }

    public StringFilter getSurname() {
        return surname;
    }

    public void setSurname(StringFilter surname) {
        this.surname = surname;
    }

    public StringFilter getForeNames() {
        return foreNames;
    }

    public void setForeNames(StringFilter foreNames) {
        this.foreNames = foreNames;
    }

    public SexFilter getSex() {
        return sex;
    }

    public void setSex(SexFilter sex) {
        this.sex = sex;
    }

    public StringFilter getPlaceOfBirth() {
        return placeOfBirth;
    }

    public void setPlaceOfBirth(StringFilter placeOfBirth) {
        this.placeOfBirth = placeOfBirth;
    }

    public LocalDateFilter getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDateFilter dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public StringFilter getPlaceOfDeath() {
        return placeOfDeath;
    }

    public void setPlaceOfDeath(StringFilter placeOfDeath) {
        this.placeOfDeath = placeOfDeath;
    }

    public LocalDateFilter getDateOfDeath() {
        return dateOfDeath;
    }

    public void setDateOfDeath(LocalDateFilter dateOfDeath) {
        this.dateOfDeath = dateOfDeath;
    }

    public StringFilter getBriefNote() {
        return briefNote;
    }

    public void setBriefNote(StringFilter briefNote) {
        this.briefNote = briefNote;
    }

    public StringFilter getNotes() {
        return notes;
    }

    public void setNotes(StringFilter notes) {
        this.notes = notes;
    }

    public LongFilter getFatherId() {
        return fatherId;
    }

    public void setFatherId(LongFilter fatherId) {
        this.fatherId = fatherId;
    }

    public LongFilter getMotherId() {
        return motherId;
    }

    public void setMotherId(LongFilter motherId) {
        this.motherId = motherId;
    }

    public LongFilter getSpouseId() {
        return spouseId;
    }

    public void setSpouseId(LongFilter spouseId) {
        this.spouseId = spouseId;
    }

    public LongFilter getSourceId() {
        return sourceId;
    }

    public void setSourceId(LongFilter sourceId) {
        this.sourceId = sourceId;
    }

    @Override
    public String toString() {
        return "PersonCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (idNumber != null ? "idNumber=" + idNumber + ", " : "") +
                (surname != null ? "surname=" + surname + ", " : "") +
                (foreNames != null ? "foreNames=" + foreNames + ", " : "") +
                (sex != null ? "sex=" + sex + ", " : "") +
                (placeOfBirth != null ? "placeOfBirth=" + placeOfBirth + ", " : "") +
                (dateOfBirth != null ? "dateOfBirth=" + dateOfBirth + ", " : "") +
                (placeOfDeath != null ? "placeOfDeath=" + placeOfDeath + ", " : "") +
                (dateOfDeath != null ? "dateOfDeath=" + dateOfDeath + ", " : "") +
                (briefNote != null ? "briefNote=" + briefNote + ", " : "") +
                (notes != null ? "notes=" + notes + ", " : "") +
                (fatherId != null ? "fatherId=" + fatherId + ", " : "") +
                (motherId != null ? "motherId=" + motherId + ", " : "") +
                (spouseId != null ? "spouseId=" + spouseId + ", " : "") +
                (sourceId != null ? "sourceId=" + sourceId + ", " : "") +
            "}";
    }

}
