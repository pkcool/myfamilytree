package io.myfamilytree.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A StaticSource.
 */
@Entity
@Table(name = "static_source")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "staticsource")
public class StaticSource implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "source_path")
    private String sourcePath;

    @Column(name = "jhi_comment")
    private String comment;

    @ManyToMany(mappedBy = "sources")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Person> people = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSourcePath() {
        return sourcePath;
    }

    public StaticSource sourcePath(String sourcePath) {
        this.sourcePath = sourcePath;
        return this;
    }

    public void setSourcePath(String sourcePath) {
        this.sourcePath = sourcePath;
    }

    public String getComment() {
        return comment;
    }

    public StaticSource comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Set<Person> getPeople() {
        return people;
    }

    public StaticSource people(Set<Person> people) {
        this.people = people;
        return this;
    }

    public StaticSource addPerson(Person person) {
        this.people.add(person);
        person.getSources().add(this);
        return this;
    }

    public StaticSource removePerson(Person person) {
        this.people.remove(person);
        person.getSources().remove(this);
        return this;
    }

    public void setPeople(Set<Person> people) {
        this.people = people;
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
        StaticSource staticSource = (StaticSource) o;
        if (staticSource.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), staticSource.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StaticSource{" +
            "id=" + getId() +
            ", sourcePath='" + getSourcePath() + "'" +
            ", comment='" + getComment() + "'" +
            "}";
    }
}
