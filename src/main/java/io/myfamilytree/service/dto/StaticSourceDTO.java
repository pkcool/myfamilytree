package io.myfamilytree.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the StaticSource entity.
 */
public class StaticSourceDTO implements Serializable {

    private Long id;

    private String sourcePath;

    private String comment;

    private Long personId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSourcePath() {
        return sourcePath;
    }

    public void setSourcePath(String sourcePath) {
        this.sourcePath = sourcePath;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Long getPersonId() {
        return personId;
    }

    public void setPersonId(Long personId) {
        this.personId = personId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        StaticSourceDTO staticSourceDTO = (StaticSourceDTO) o;
        if(staticSourceDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), staticSourceDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StaticSourceDTO{" +
            "id=" + getId() +
            ", sourcePath='" + getSourcePath() + "'" +
            ", comment='" + getComment() + "'" +
            "}";
    }
}
