package io.myfamilytree.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import io.myfamilytree.domain.enumeration.Sex;

/**
 * A Person.
 */
@Entity
@Table(name = "person")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "person")
public class Person implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_number")
    private String idNumber;

    @Column(name = "surname")
    private String surname;

    @Column(name = "fore_names")
    private String foreNames;

    @Enumerated(EnumType.STRING)
    @Column(name = "sex")
    private Sex sex;

    @Column(name = "place_of_birth")
    private String placeOfBirth;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "place_of_death")
    private String placeOfDeath;

    @Column(name = "date_of_death")
    private LocalDate dateOfDeath;

    @Column(name = "brief_note")
    private String briefNote;

    @Column(name = "notes")
    private String notes;

    @OneToOne
    @JoinColumn(unique = true)
    private Person father;

    @OneToOne
    @JoinColumn(unique = true)
    private Person mother;

    @OneToOne
    @JoinColumn(unique = true)
    private Person spouse;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "person_source",
               joinColumns = @JoinColumn(name="people_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="sources_id", referencedColumnName="id"))
    private Set<StaticSource> sources = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdNumber() {
        return idNumber;
    }

    public Person idNumber(String idNumber) {
        this.idNumber = idNumber;
        return this;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public String getSurname() {
        return surname;
    }

    public Person surname(String surname) {
        this.surname = surname;
        return this;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getForeNames() {
        return foreNames;
    }

    public Person foreNames(String foreNames) {
        this.foreNames = foreNames;
        return this;
    }

    public void setForeNames(String foreNames) {
        this.foreNames = foreNames;
    }

    public Sex getSex() {
        return sex;
    }

    public Person sex(Sex sex) {
        this.sex = sex;
        return this;
    }

    public void setSex(Sex sex) {
        this.sex = sex;
    }

    public String getPlaceOfBirth() {
        return placeOfBirth;
    }

    public Person placeOfBirth(String placeOfBirth) {
        this.placeOfBirth = placeOfBirth;
        return this;
    }

    public void setPlaceOfBirth(String placeOfBirth) {
        this.placeOfBirth = placeOfBirth;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public Person dateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
        return this;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getPlaceOfDeath() {
        return placeOfDeath;
    }

    public Person placeOfDeath(String placeOfDeath) {
        this.placeOfDeath = placeOfDeath;
        return this;
    }

    public void setPlaceOfDeath(String placeOfDeath) {
        this.placeOfDeath = placeOfDeath;
    }

    public LocalDate getDateOfDeath() {
        return dateOfDeath;
    }

    public Person dateOfDeath(LocalDate dateOfDeath) {
        this.dateOfDeath = dateOfDeath;
        return this;
    }

    public void setDateOfDeath(LocalDate dateOfDeath) {
        this.dateOfDeath = dateOfDeath;
    }

    public String getBriefNote() {
        return briefNote;
    }

    public Person briefNote(String briefNote) {
        this.briefNote = briefNote;
        return this;
    }

    public void setBriefNote(String briefNote) {
        this.briefNote = briefNote;
    }

    public String getNotes() {
        return notes;
    }

    public Person notes(String notes) {
        this.notes = notes;
        return this;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Person getFather() {
        return father;
    }

    public Person father(Person person) {
        this.father = person;
        return this;
    }

    public void setFather(Person person) {
        this.father = person;
    }

    public Person getMother() {
        return mother;
    }

    public Person mother(Person person) {
        this.mother = person;
        return this;
    }

    public void setMother(Person person) {
        this.mother = person;
    }

    public Person getSpouse() {
        return spouse;
    }

    public Person spouse(Person person) {
        this.spouse = person;
        return this;
    }

    public void setSpouse(Person person) {
        this.spouse = person;
    }

    public Set<StaticSource> getSources() {
        return sources;
    }

    public Person sources(Set<StaticSource> staticSources) {
        this.sources = staticSources;
        return this;
    }

    public Person addSource(StaticSource staticSource) {
        this.sources.add(staticSource);
        staticSource.getPeople().add(this);
        return this;
    }

    public Person removeSource(StaticSource staticSource) {
        this.sources.remove(staticSource);
        staticSource.getPeople().remove(this);
        return this;
    }

    public void setSources(Set<StaticSource> staticSources) {
        this.sources = staticSources;
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
        Person person = (Person) o;
        if (person.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), person.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Person{" +
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
