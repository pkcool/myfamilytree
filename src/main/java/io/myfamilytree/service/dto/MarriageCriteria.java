package io.myfamilytree.service.dto;

import java.io.Serializable;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;


import io.github.jhipster.service.filter.LocalDateFilter;



/**
 * Criteria class for the Marriage entity. This class is used in MarriageResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /marriages?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class MarriageCriteria implements Serializable {
    private static final long serialVersionUID = 1L;


    private LongFilter id;

    private LocalDateFilter dateOfMarriage;

    private LocalDateFilter endOfMarriage;

    private StringFilter notes;

    private LongFilter maleId;

    private LongFilter femaleId;

    public MarriageCriteria() {
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public LocalDateFilter getDateOfMarriage() {
        return dateOfMarriage;
    }

    public void setDateOfMarriage(LocalDateFilter dateOfMarriage) {
        this.dateOfMarriage = dateOfMarriage;
    }

    public LocalDateFilter getEndOfMarriage() {
        return endOfMarriage;
    }

    public void setEndOfMarriage(LocalDateFilter endOfMarriage) {
        this.endOfMarriage = endOfMarriage;
    }

    public StringFilter getNotes() {
        return notes;
    }

    public void setNotes(StringFilter notes) {
        this.notes = notes;
    }

    public LongFilter getMaleId() {
        return maleId;
    }

    public void setMaleId(LongFilter maleId) {
        this.maleId = maleId;
    }

    public LongFilter getFemaleId() {
        return femaleId;
    }

    public void setFemaleId(LongFilter femaleId) {
        this.femaleId = femaleId;
    }

    @Override
    public String toString() {
        return "MarriageCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (dateOfMarriage != null ? "dateOfMarriage=" + dateOfMarriage + ", " : "") +
                (endOfMarriage != null ? "endOfMarriage=" + endOfMarriage + ", " : "") +
                (notes != null ? "notes=" + notes + ", " : "") +
                (maleId != null ? "maleId=" + maleId + ", " : "") +
                (femaleId != null ? "femaleId=" + femaleId + ", " : "") +
            "}";
    }

}
