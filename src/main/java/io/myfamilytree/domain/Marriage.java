package io.myfamilytree.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Marriage.
 */
@Entity
@Table(name = "marriage")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "marriage")
public class Marriage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_of_marriage")
    private LocalDate dateOfMarriage;

    @Column(name = "end_of_marriage")
    private LocalDate endOfMarriage;

    @Column(name = "notes")
    private String notes;

    @OneToOne
    @JoinColumn(unique = true)
    private Person male;

    @OneToOne
    @JoinColumn(unique = true)
    private Person female;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateOfMarriage() {
        return dateOfMarriage;
    }

    public Marriage dateOfMarriage(LocalDate dateOfMarriage) {
        this.dateOfMarriage = dateOfMarriage;
        return this;
    }

    public void setDateOfMarriage(LocalDate dateOfMarriage) {
        this.dateOfMarriage = dateOfMarriage;
    }

    public LocalDate getEndOfMarriage() {
        return endOfMarriage;
    }

    public Marriage endOfMarriage(LocalDate endOfMarriage) {
        this.endOfMarriage = endOfMarriage;
        return this;
    }

    public void setEndOfMarriage(LocalDate endOfMarriage) {
        this.endOfMarriage = endOfMarriage;
    }

    public String getNotes() {
        return notes;
    }

    public Marriage notes(String notes) {
        this.notes = notes;
        return this;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Person getMale() {
        return male;
    }

    public Marriage male(Person person) {
        this.male = person;
        return this;
    }

    public void setMale(Person person) {
        this.male = person;
    }

    public Person getFemale() {
        return female;
    }

    public Marriage female(Person person) {
        this.female = person;
        return this;
    }

    public void setFemale(Person person) {
        this.female = person;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Marriage marriage = (Marriage) o;
        if (marriage.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), marriage.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Marriage{" +
            "id=" + getId() +
            ", dateOfMarriage='" + getDateOfMarriage() + "'" +
            ", endOfMarriage='" + getEndOfMarriage() + "'" +
            ", notes='" + getNotes() + "'" +
            "}";
    }
}
